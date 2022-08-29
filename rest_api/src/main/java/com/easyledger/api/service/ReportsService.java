package com.easyledger.api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.dto.AccountTransactionsReportLineItemDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.viewmodel.AccountTransactionsReportViewModel;
import com.easyledger.api.viewmodel.BalanceSheetAssetsViewModel;
import com.easyledger.api.viewmodel.BalanceSheetEquityViewModel;
import com.easyledger.api.viewmodel.BalanceSheetLiabilitiesViewModel;
import com.easyledger.api.viewmodel.BalanceSheetViewModel;
import com.easyledger.api.viewmodel.CashFlowStatementViewModel;
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
	
	
	public ReportsService(AccountRepository accountRepo, AccountSubtypeRepository accountSubtypeRepo, 
			OrganizationRepository organizationRepo, LineItemService lineItemService, AccountService accountService) {
		super();
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.organizationRepo = organizationRepo;
		this.accountService = accountService;
		this.lineItemService = lineItemService;
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
			lineItemsWithTotals.add(new AccountTransactionsReportLineItemDTO(lineItem, currentCreditValue, currentCreditValue));
		}
		
		return new AccountTransactionsReportViewModel(startDate, endDate, initialAccountBalance, initialDebitValue, initialCreditValue, lineItemsWithTotals, currentDebitValue, currentCreditValue);

	}

}
