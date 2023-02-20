package com.easyledger.api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountInReportDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.dto.AccountTransactionsReportLineItemDTO;
import com.easyledger.api.dto.BalanceSheetDTO;
import com.easyledger.api.dto.CustomerIncomeDTO;
import com.easyledger.api.dto.DateRangeDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.dto.VendorExpensesDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.CustomerRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.viewmodel.AccountTransactionsReportViewModel;
import com.easyledger.api.viewmodel.BalanceSheetAssetsViewModel;
import com.easyledger.api.viewmodel.BalanceSheetEquityViewModel;
import com.easyledger.api.viewmodel.BalanceSheetLiabilitiesViewModel;
import com.easyledger.api.viewmodel.BalanceSheetViewModel;
import com.easyledger.api.viewmodel.CashFlowStatementViewModel;
import com.easyledger.api.viewmodel.ExpensesByVendorReportViewModel;
import com.easyledger.api.viewmodel.IncomeByCustomerReportViewModel;
import com.easyledger.api.viewmodel.IncomeStatementViewModel;

@Service
public class ReportsService {
	@Autowired
	private AccountRepository accountRepo;
		
	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired 
	private LineItemService lineItemService;
	
	@Autowired
	private VendorRepository vendorRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	
	public ReportsService(AccountRepository accountRepo, AccountSubtypeRepository accountSubtypeRepo, 
			OrganizationRepository organizationRepo, LineItemService lineItemService, AccountService accountService, 
			VendorRepository vendorRepo, CustomerRepository customerRepo) {
		super();
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.organizationRepo = organizationRepo;
		this.accountService = accountService;
		this.lineItemService = lineItemService;
		this.vendorRepo = vendorRepo;
		this.customerRepo = customerRepo;
	}


//TODO test leap day
	public BalanceSheetViewModel getBalanceSheetViewModelForOrganizationUpToDate(Long organizationId, LocalDate endDate) 
			throws ResourceNotFoundException {
		BalanceSheetViewModel generatedBalanceSheet = new BalanceSheetViewModel();
		generatedBalanceSheet.setOrganizationId(organizationId);
		generatedBalanceSheet.setAsOfDate(endDate);
		generatedBalanceSheet.setAccountBalances(accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, endDate));
		
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		LocalDate fiscalYearEnd = organization.getFiscalYearBegin().minusDays(1);
		
		if (fiscalYearEnd.withYear(endDate.getYear()).compareTo(endDate) >= 0) {
			fiscalYearEnd = fiscalYearEnd.withYear(endDate.getYear() -1);
		} else {
			fiscalYearEnd = fiscalYearEnd.withYear(endDate.getYear());
		}
		
		LocalDate fiscalYearBegin = fiscalYearEnd.plusDays(1);
		
		generatedBalanceSheet.setPrevPeriodEndDate(fiscalYearEnd);
		generatedBalanceSheet.setCurrPeriodStartDate(fiscalYearBegin);
		
		List<AccountSubtypeBalanceDTO> totalAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, endDate);
		List<AccountSubtypeBalanceDTO> prevPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, fiscalYearEnd);
		List<AccountSubtypeBalanceDTO> currPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, fiscalYearBegin, endDate);
		
		generatedBalanceSheet.setBalanceSheetAssets(new BalanceSheetAssetsViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetLiabilities(new BalanceSheetLiabilitiesViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetEquity(new BalanceSheetEquityViewModel(prevPeriodAccountSubtypeBalances, currPeriodAccountSubtypeBalances, totalAccountSubtypeBalances));
		return generatedBalanceSheet;
	}
	
	public IncomeStatementViewModel getIncomeStatementViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<AccountSubtypeBalanceDTO> accountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		List<AccountDTO> accountBalances = accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		
		return new IncomeStatementViewModel(accountSubtypeBalances, accountBalances, startDate, endDate);
	}
	
	public CashFlowStatementViewModel getCashFlowStatementViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<AccountSubtypeBalanceDTO> currPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		List<AccountSubtypeBalanceDTO> beginningAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, startDate.minusDays(1));
		List<AccountSubtypeBalanceDTO> endingAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, endDate);
		return new CashFlowStatementViewModel(currPeriodAccountSubtypeBalances, beginningAccountSubtypeBalances, endingAccountSubtypeBalances);
	}
	
	public AccountTransactionsReportViewModel getAccountTransactionsReportViewModelForAccountBetweenDates(Long accountId, LocalDate startDate, LocalDate endDate) {
		AccountBalanceDTO initialAccountBalance = accountService.getAccountBalanceUpToDateExclusive(accountId, startDate);
		BigDecimal initialDebitValue = initialAccountBalance.getDebitTotal();
		BigDecimal initialCreditValue = initialAccountBalance.getCreditTotal();
		
		BigDecimal currentDebitValue = initialAccountBalance.getDebitTotal();
		BigDecimal currentCreditValue = initialAccountBalance.getCreditTotal();
		List<LineItemDTO> lineItems = lineItemService.getLineItemsForAccountBetweenDates(accountId, startDate, endDate);
		
		List<AccountTransactionsReportLineItemDTO> lineItemsWithTotals = new ArrayList<AccountTransactionsReportLineItemDTO>();
		
		for (LineItemDTO lineItem : lineItems) {
			if (lineItem.isIsCredit()) {
				currentCreditValue = currentCreditValue.add(lineItem.getAmount());
			} else {
				currentDebitValue = currentDebitValue.add(lineItem.getAmount());
			}
			lineItemsWithTotals.add(new AccountTransactionsReportLineItemDTO(lineItem, currentDebitValue, currentCreditValue));
		}
		
		return new AccountTransactionsReportViewModel(startDate, endDate, initialAccountBalance, initialDebitValue, initialCreditValue, lineItemsWithTotals, currentDebitValue, currentCreditValue);

	}
	
	public ExpensesByVendorReportViewModel getExpensesByVendorReportViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<VendorExpensesDTO> vendorExpensesDTOs = vendorRepo.getExpensesByVendorForOrganizationBetweenDates(organizationId, startDate, endDate);
		BigDecimal totalExpenses = organizationRepo.getTotalExpensesForOrganizationBetweenDates(organizationId, startDate, endDate);
		return new ExpensesByVendorReportViewModel(vendorExpensesDTOs, totalExpenses);
	}
	
	public IncomeByCustomerReportViewModel getIncomeByCustomerReportViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<CustomerIncomeDTO> customerIncomeDTOs = customerRepo.getIncomeByCustomerForOrganizationBetweenDates(organizationId, startDate, endDate);
		BigDecimal totalIncome = organizationRepo.getTotalIncomeForOrganizationBetweenDates(organizationId, startDate, endDate);
		return new IncomeByCustomerReportViewModel(customerIncomeDTOs, totalIncome);
	}

	public BalanceSheetDTO generateBalanceSheet(Long organizationId, List<DateRangeDTO> dates) {
		BalanceSheetDTO generatedBalanceSheet = new BalanceSheetDTO();
		List<List<AccountBalanceDTO>> listsOfAccountBalancesForDates = new ArrayList<List<AccountBalanceDTO>>();
		//fetch a list of accounts for each date range
		for (DateRangeDTO dateRange : dates) {
			List<AccountBalanceDTO> accountBalancesUpToDate = accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, dateRange.getEndDate());
			listsOfAccountBalancesForDates.add(accountBalancesUpToDate);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<AccountInReportDTO> convertedList = convertListOfListOfAccountBalanceDTOsToListOfAccountInReportDTO(listsOfAccountBalancesForDates);
		//rearrange list of AccountInReportDTO to put children where they belong
		for (AccountInReportDTO potentialParentAccount : convertedList) {
			if (potentialParentAccount.isHasChildren()) {
				for (AccountInReportDTO potentialChildAccount : convertedList) {
					if (potentialChildAccount.getParentAccountId() != null && potentialChildAccount.getParentAccountId() == potentialParentAccount.getAccountId()) {
						potentialParentAccount.getChildren().add(potentialChildAccount);
						convertedList.remove(potentialChildAccount);
					}
				}
			}
		}
		//put accounts into correct lists in balance sheet
		for (AccountInReportDTO account : convertedList) {
			//use legacy accountSubtype for formatting first
			//then use balanceSheetFormatPosition00000
		}
		//calculate retained earnings
		return generatedBalanceSheet;
	}
	
	/* 
	 * Takes a list of list of AccountBalanceDTOs as an argument.
	 * This method assumes that the input list only contains lists where the contents differ only by AccountBalanceDTO.debitsMinusCredits
	 * In other words, each list must contain the same number of accounts, in the same order, with the same accountIds.
	 * This method consolidates these lists into a single list of AccountInReportDTOs,
	 * where AccountInReportDTO.amounts is a list of the respective amounts for that account.
	 * In other words, this method takes in multiple lists of accounts, each with one debitsMinusCredits value,
	 * and returns a single list of accounts, with multiple 'amounts' values.
	 * Each amount in AccountInReportDTO.amounts is equivalent to Account.debitsMinusCredits. 
	 * CAUTION: This method does not validate inputs.*/
	public List<AccountInReportDTO> convertListOfListOfAccountBalanceDTOsToListOfAccountInReportDTO(List<List<AccountBalanceDTO>> lists) {
		List<AccountInReportDTO> returnedList = new ArrayList<AccountInReportDTO>();
		//if the input list of lists is not empty, use the first list to populate returnedList with the correct number of AccountInReportDTO.
		if (lists.size() > 0) {
			for (AccountBalanceDTO account : lists.get(0)) {
				AccountInReportDTO createdAccountInReportDTO = new AccountInReportDTO(account);
				returnedList.add(createdAccountInReportDTO);
			}
		}
		//iterate through lists in order to add amount values to AccountInReportDTOs
		for (List<AccountBalanceDTO> list : lists) {
			for (int i = 0; i < list.size(); i++) {
				//this is ugly, sorry. takes the AccountBalanceDTO at index i in list, and appends its debitsMinusCredits to 'amounts' list in the AccountInReportDTO at index i in returnedList
				returnedList.get(i).getAmounts().add(list.get(i).getDebitsMinusCredits());
			}
		}
		return returnedList;
	}
}
