package com.easyledger.api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountInReportDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.dto.AccountSubtypeInReportDTO;
import com.easyledger.api.dto.AccountTransactionsReportLineItemDTO;
import com.easyledger.api.dto.BalanceSheetDTO;
import com.easyledger.api.dto.CashFlowStatementDTO;
import com.easyledger.api.dto.CustomerIncomeDTO;
import com.easyledger.api.dto.CustomerIncomeInReportDTO;
import com.easyledger.api.dto.DateRangeDTO;
import com.easyledger.api.dto.ExpensesByVendorReportDTO;
import com.easyledger.api.dto.IncomeByCustomerReportDTO;
import com.easyledger.api.dto.IncomeExpenseReportDTO;
import com.easyledger.api.dto.IncomeStatementDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.dto.NetWorthReportDTO;
import com.easyledger.api.dto.VendorExpensesDTO;
import com.easyledger.api.dto.VendorExpensesInReportDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.CustomerRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.utility.Utility;
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


	@Deprecated
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
	
	@Deprecated
	public IncomeStatementViewModel getIncomeStatementViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<AccountSubtypeBalanceDTO> accountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		List<AccountDTO> accountBalances = accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		
		return new IncomeStatementViewModel(accountSubtypeBalances, accountBalances, startDate, endDate);
	}
	
	@Deprecated
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
	
	@Deprecated
	public ExpensesByVendorReportViewModel getExpensesByVendorReportViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<VendorExpensesDTO> vendorExpensesDTOs = vendorRepo.getExpensesByVendorForOrganizationBetweenDates(organizationId, startDate, endDate);
		BigDecimal totalExpenses = organizationRepo.getTotalExpensesForOrganizationBetweenDates(organizationId, startDate, endDate);
		return new ExpensesByVendorReportViewModel(vendorExpensesDTOs, totalExpenses);
	}
	
	@Deprecated
	public IncomeByCustomerReportViewModel getIncomeByCustomerReportViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<CustomerIncomeDTO> customerIncomeDTOs = customerRepo.getIncomeByCustomerForOrganizationBetweenDates(organizationId, startDate, endDate);
		BigDecimal totalIncome = organizationRepo.getTotalIncomeForOrganizationBetweenDates(organizationId, startDate, endDate);
		return new IncomeByCustomerReportViewModel(customerIncomeDTOs, totalIncome);
	}
	
	public ExpensesByVendorReportDTO generateExpensesByVendorReport(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException, ConflictException {
		ExpensesByVendorReportDTO generatedReport = new ExpensesByVendorReportDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<VendorExpensesInReportDTO> vendors = getListOfVendorExpensesInReportDTOBetweenDates(organizationId, dates);
		List<BigDecimal> totalExpensesWithNamedVendors = new ArrayList<BigDecimal>();
		for (VendorExpensesInReportDTO vendor : vendors) {
			totalExpensesWithNamedVendors = Utility.addLists(totalExpensesWithNamedVendors, vendor.getAmounts());
		}
		List<BigDecimal> totalExpenses = new ArrayList<BigDecimal>();
		for (DateRangeDTO date : dates) {
			totalExpenses.add(organizationRepo.getTotalExpensesForOrganizationBetweenDates(organizationId, date.getStartDate(), date.getEndDate()));
		}
		VendorExpensesInReportDTO vendorlessExpenses = new VendorExpensesInReportDTO();
		vendorlessExpenses.setAmounts(Utility.subtractLists(totalExpenses, totalExpensesWithNamedVendors));
		vendors.add(vendorlessExpenses);
		
 		generatedReport.setDateRanges(dates);
		generatedReport.setVendors(vendors);
		generatedReport.setTotalExpenses(totalExpenses);
		return generatedReport;
	}
	public IncomeByCustomerReportDTO generateIncomeByCustomerReport(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException, ConflictException {
		IncomeByCustomerReportDTO generatedReport = new IncomeByCustomerReportDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<CustomerIncomeInReportDTO> customers = getListOfCustomerIncomeInReportDTOBetweenDates(organizationId, dates);
		List<BigDecimal> totalIncomeWithNamedCustomers = new ArrayList<BigDecimal>();
		for (CustomerIncomeInReportDTO customer : customers) {
			totalIncomeWithNamedCustomers = Utility.addLists(totalIncomeWithNamedCustomers, customer.getAmounts());
		}
		List<BigDecimal> totalIncome = new ArrayList<BigDecimal>();
		for (DateRangeDTO date : dates) {
			totalIncome.add(organizationRepo.getTotalIncomeForOrganizationBetweenDates(organizationId, date.getStartDate(), date.getEndDate()));
		}
		CustomerIncomeInReportDTO customerlessIncome = new CustomerIncomeInReportDTO();
		customerlessIncome.setAmounts(Utility.subtractLists(totalIncome, totalIncomeWithNamedCustomers));
		customers.add(customerlessIncome);
		
 		generatedReport.setDateRanges(dates);
		generatedReport.setCustomers(customers);
		generatedReport.setTotalIncome(totalIncome);
		return generatedReport;
	}

	public NetWorthReportDTO generateNetWorthReport(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException {
		NetWorthReportDTO generatedNetWorthReport = new NetWorthReportDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<AccountInReportDTO> allAccounts = getListOfAccountInReportDTOUpToDate(organizationId, dates);
		
		List<AccountInReportDTO> assetAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> liabilityAccounts = new ArrayList<AccountInReportDTO>();
		
		for (AccountInReportDTO account : allAccounts) {
			if (account.getAccountTypeId().equals((long) 1)) {
				assetAccounts.add(account);
			} else if (account.getAccountTypeId().equals((long) 2)) {
				liabilityAccounts.add(account);
			}
		}

		AccountInReportDTO.negateAmountsOfAccounts(liabilityAccounts);
		List<BigDecimal> totalAssets = AccountInReportDTO.sumAmountsOfAccounts(assetAccounts);
		List<BigDecimal> totalLiabilities = AccountInReportDTO.sumAmountsOfAccounts(liabilityAccounts);
		List<BigDecimal> totalNetWorth = Utility.subtractLists(totalAssets, totalLiabilities);
		generatedNetWorthReport.setDateRanges(dates);
		generatedNetWorthReport.setAssetAccounts(assetAccounts);
		generatedNetWorthReport.setLiabilityAccounts(liabilityAccounts);
		generatedNetWorthReport.setTotalAssets(totalAssets);
		generatedNetWorthReport.setTotalLiabilities(totalLiabilities);
		generatedNetWorthReport.setTotalNetWorth(totalNetWorth);
		return generatedNetWorthReport;
	}
	
	public IncomeExpenseReportDTO generateIncomeExpenseReport(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException, ConflictException {
		IncomeExpenseReportDTO generatedReport = new IncomeExpenseReportDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<AccountInReportDTO> allAccounts = getListOfAccountInReportDTOBetweenDates(organizationId, dates);
		
		List<AccountInReportDTO> incomeAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> expenseAccounts = new ArrayList<AccountInReportDTO>();
		
		for (AccountInReportDTO account : allAccounts) {
			if (account.getAccountTypeId().equals((long) 4)) {
				incomeAccounts.add(account);
			} else if (account.getAccountTypeId().equals((long) 5)) {
				expenseAccounts.add(account);
			}
		}
		
		AccountInReportDTO.negateAmountsOfAccounts(incomeAccounts);
		List<BigDecimal> totalIncome = AccountInReportDTO.sumAmountsOfAccounts(incomeAccounts);
		List<BigDecimal> totalExpenses = AccountInReportDTO.sumAmountsOfAccounts(expenseAccounts);
		List<BigDecimal> totalIncomeMinusExpenses = Utility.subtractLists(totalIncome, totalExpenses);
		generatedReport.setDateRanges(dates);
		generatedReport.setIncomeAccounts(incomeAccounts);
		generatedReport.setTotalIncome(totalIncome);
		generatedReport.setExpenseAccounts(expenseAccounts);
		generatedReport.setTotalExpenses(totalExpenses);
		generatedReport.setTotalIncomeMinusExpenses(totalIncomeMinusExpenses);
		return generatedReport;
	}
	//By default, AccountInReportDTO.amounts are represented as debits minus credits, but see note on com.easyledger.api.dto.CashFlowStatementDTO.
	public CashFlowStatementDTO generateCashFlowStatement(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException, ConflictException {
		CashFlowStatementDTO generatedCashFlowStatement = new CashFlowStatementDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<DateRangeDTO> prevPeriodDates = new ArrayList<DateRangeDTO>();
		for (DateRangeDTO dateRange : dates) {
			prevPeriodDates.add(new DateRangeDTO(dateRange.getStartDate().minusDays(1)));
		}
		List<AccountInReportDTO> accountsUpToPreviousPeriodEndDate = getListOfAccountInReportDTOUpToDate(organizationId, prevPeriodDates);
		List<AccountInReportDTO> accountsUpToCurrentPeriodEndDate = getListOfAccountInReportDTOUpToDate(organizationId, dates);
		List<AccountInReportDTO> accountsForCurrentPeriod = getListOfAccountInReportDTOBetweenDates(organizationId, dates);
		
		List<AccountInReportDTO> cashAndCashEquivalentsAccountsBeginning = new ArrayList<AccountInReportDTO>();
		for (AccountInReportDTO account : accountsUpToPreviousPeriodEndDate) {
			if (account.getCashFlowFormatPositionId().equals((long) 5)) {
				cashAndCashEquivalentsAccountsBeginning.add(account);
			}
		}
		generatedCashFlowStatement.setDateRanges(dates);
		generatedCashFlowStatement.setCashAndCashEquivalentsAccountsBeginning(cashAndCashEquivalentsAccountsBeginning);
		generatedCashFlowStatement.setTotalCashAndCashEquivalentsBeginning(AccountInReportDTO.sumAmountsOfAccounts(cashAndCashEquivalentsAccountsBeginning));
		
		List<AccountInReportDTO> cashAndCashEquivalentsAccountsEnding = new ArrayList<AccountInReportDTO>();
		for (AccountInReportDTO account : accountsUpToCurrentPeriodEndDate) {
			if (account.getCashFlowFormatPositionId().equals((long) 5)) {
				cashAndCashEquivalentsAccountsEnding.add(account);
			}
		}
		generatedCashFlowStatement.setCashAndCashEquivalentsAccountsEnding(cashAndCashEquivalentsAccountsEnding);
		generatedCashFlowStatement.setTotalCashAndCashEquivalentsEnding(AccountInReportDTO.sumAmountsOfAccounts(cashAndCashEquivalentsAccountsEnding));

		List<AccountInReportDTO> incomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonCashOperatingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInOperatingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInOperatingEquityAccounts = new ArrayList<AccountInReportDTO>();

		List<AccountInReportDTO> incomeExpenseFromInvestingAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonCashInvestingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInInvestingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInInvestingEquityAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> depreciationAdjustmentAccounts = new ArrayList<AccountInReportDTO>();
		
		List<AccountInReportDTO> incomeExpenseFromFinancingAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonCashFinancingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInNonDividendFinancingEquityAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> changesInNonDividendFinancingAssetLiabilityAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> dividendEquityAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> dividendLiabilityAccounts = new ArrayList<AccountInReportDTO>();
		
		List<AccountInReportDTO> interestExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> interestLiabilityAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> taxExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> taxLiabilityAccounts = new ArrayList<AccountInReportDTO>();
		
		for (AccountInReportDTO account : accountsForCurrentPeriod) {
			if (account.getCashFlowFormatPositionId().equals((long) 2)) {//note when writing front end, not all options can be exposed to the consumer
				if (account.getAccountTypeId().equals((long) 4) || account.getAccountTypeId().equals((long) 5)) {
					incomeExpenseAccounts.add(account);
					if (!account.isCashItem()) {
						nonCashOperatingIncomeExpenseAccounts.add(account);
					}
					if (account.isRelevantToDepreciationAmortization()) {
						depreciationAdjustmentAccounts.add(account);
					}
				} else if (account.getAccountTypeId().equals((long) 1) || account.getAccountTypeId().equals((long) 2)) {
					changesInOperatingAssetsLiabilitiesAccounts.add(account);
				} else if (account.getAccountTypeId().equals((long) 3)) {
					changesInOperatingEquityAccounts.add(account);
				}
			} else if (account.getCashFlowFormatPositionId().equals((long) 3)) {
				if (account.getAccountTypeId().equals((long) 4) || account.getAccountTypeId().equals((long) 5)) {
					incomeExpenseAccounts.add(account);
					incomeExpenseFromInvestingAccounts.add(account);
					if (!account.isCashItem()) {
						nonCashInvestingIncomeExpenseAccounts.add(account);
					}
					if (account.isRelevantToDepreciationAmortization()) {
						depreciationAdjustmentAccounts.add(account);
					}
				} else if (account.getAccountTypeId().equals((long) 1) || account.getAccountTypeId().equals((long) 2)) {
					changesInInvestingAssetsLiabilitiesAccounts.add(account);
				} else if (account.getAccountTypeId().equals((long) 3)) {
					changesInInvestingEquityAccounts.add(account);
				}
			} else if (account.getCashFlowFormatPositionId().equals((long) 4)) {
				if (account.getAccountTypeId().equals((long) 4) || account.getAccountTypeId().equals((long) 5)) {
					incomeExpenseAccounts.add(account);
					incomeExpenseFromFinancingAccounts.add(account);
					if (!account.isCashItem()) {
						nonCashFinancingIncomeExpenseAccounts.add(account);
					}
					if (account.isRelevantToDepreciationAmortization()) {
						depreciationAdjustmentAccounts.add(account);
					}
				} else {
					if (account.isRelevantToDividendsPaid()) {
						if (account.getAccountTypeId().equals((long) 3)) {
							dividendEquityAccounts.add(account);
						} else {
							dividendLiabilityAccounts.add(account);
						}
					} else {
						if (account.getAccountTypeId().equals((long) 3)) {
							changesInNonDividendFinancingEquityAccounts.add(account);
						} else {
							changesInNonDividendFinancingAssetLiabilityAccounts.add(account);
						}
					}
				}
			}	
			if (account.isRelevantToInterestPaid()) {
				if (account.getAccountTypeId().equals((long) 5)) {
					interestExpenseAccounts.add(account);
				} else if (account.getAccountTypeId().equals((long) 2)) {
					interestLiabilityAccounts.add(account);
				}
			} else if (account.isRelevantToTaxesPaid()) {
				if (account.getAccountTypeId().equals((long) 5)) {
					taxExpenseAccounts.add(account);
				} else if (account.getAccountTypeId().equals((long) 2)) {
					taxLiabilityAccounts.add(account);
				}
			}
		}
		//note to be careful, negation of lists of bigdecimal returns a deep copy of the list, but negation of AccountInReportDTO happens by reference!
		generatedCashFlowStatement.setIncomeExpenseAccounts(incomeExpenseAccounts);
		List<BigDecimal> totalNetIncome = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(incomeExpenseAccounts));
		generatedCashFlowStatement.setTotalNetIncome(totalNetIncome);
		generatedCashFlowStatement.setNonCashOperatingIncomeExpenseAccounts(nonCashOperatingIncomeExpenseAccounts);
		List<BigDecimal> totalNonCashOperatingIncomeExpense = AccountInReportDTO.sumAmountsOfAccounts(nonCashOperatingIncomeExpenseAccounts);
		generatedCashFlowStatement.setTotalNonCashOperatingIncomeExpense(totalNonCashOperatingIncomeExpense);
		generatedCashFlowStatement.setChangesInOperatingAssetsLiabilitiesAccounts(changesInOperatingAssetsLiabilitiesAccounts);
		List<BigDecimal> totalChangesInOperatingAssetsLiabilities = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInOperatingAssetsLiabilitiesAccounts));
		generatedCashFlowStatement.setTotalChangesInOperatingAssetsLiabilities(totalChangesInOperatingAssetsLiabilities);
		generatedCashFlowStatement.setChangesInOperatingEquityAccounts(changesInOperatingEquityAccounts);
		List<BigDecimal> totalChangesInOperatingEquity = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInOperatingEquityAccounts));
		generatedCashFlowStatement.setTotalChangesInOperatingEquity(totalChangesInOperatingEquity);

		generatedCashFlowStatement.setIncomeExpenseFromInvestingAccounts(incomeExpenseFromInvestingAccounts);
		List<BigDecimal> totalIncomeExpenseFromInvestingNet = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(incomeExpenseFromInvestingAccounts));
		generatedCashFlowStatement.setTotalIncomeExpenseFromInvestingNet(totalIncomeExpenseFromInvestingNet);
		generatedCashFlowStatement.setNonCashInvestingIncomeExpenseAccounts(nonCashInvestingIncomeExpenseAccounts);
		List<BigDecimal> totalNonCashInvestingIncomeExpense = AccountInReportDTO.sumAmountsOfAccounts(nonCashInvestingIncomeExpenseAccounts);
		generatedCashFlowStatement.setTotalNonCashInvestingIncomeExpense(totalNonCashInvestingIncomeExpense);
		generatedCashFlowStatement.setChangesInInvestingAssetsLiabilitiesAccounts(changesInInvestingAssetsLiabilitiesAccounts);
		List<BigDecimal> totalChangesInInvestingAssetsLiabilities = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInInvestingAssetsLiabilitiesAccounts));
		generatedCashFlowStatement.setTotalChangesInInvestingAssetsLiabilities(totalChangesInInvestingAssetsLiabilities);
		generatedCashFlowStatement.setChangesInInvestingEquityAccounts(changesInInvestingEquityAccounts);
		List<BigDecimal> totalChangesInInvestingEquity = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInInvestingEquityAccounts));
		generatedCashFlowStatement.setTotalChangesInInvestingEquity(totalChangesInInvestingEquity);
		generatedCashFlowStatement.setDepreciationAdjustmentAccounts(depreciationAdjustmentAccounts);
		List<BigDecimal> totalAdjustmentForDepreciationAmortization = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(depreciationAdjustmentAccounts));
		generatedCashFlowStatement.setTotalAdjustmentForDepreciationAmortization(totalAdjustmentForDepreciationAmortization);
		
		generatedCashFlowStatement.setIncomeExpenseFromFinancingAccounts(incomeExpenseFromFinancingAccounts);
		List<BigDecimal> totalIncomeExpenseFromFinancingNet = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(incomeExpenseFromFinancingAccounts));
		generatedCashFlowStatement.setTotalIncomeExpenseFromFinancingNet(totalIncomeExpenseFromFinancingNet);
		generatedCashFlowStatement.setNonCashFinancingIncomeExpenseAccounts(nonCashFinancingIncomeExpenseAccounts);
		List<BigDecimal> totalNonCashFinancingIncomeExpense = AccountInReportDTO.sumAmountsOfAccounts(nonCashFinancingIncomeExpenseAccounts);
		generatedCashFlowStatement.setTotalNonCashFinancingIncomeExpense(totalNonCashFinancingIncomeExpense);
		generatedCashFlowStatement.setChangesInNonDividendFinancingEquityAccounts(changesInNonDividendFinancingEquityAccounts);
		List<BigDecimal> totalChangesInNonDividendFinancingEquity = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInNonDividendFinancingEquityAccounts));
		generatedCashFlowStatement.setTotalChangesInNonDividendFinancingEquity(totalChangesInNonDividendFinancingEquity);
		generatedCashFlowStatement.setChangesInNonDividendFinancingAssetLiabilityAccounts(changesInNonDividendFinancingAssetLiabilityAccounts);
		List<BigDecimal> totalChangesInNonDividendFinancingAssetLiabilities = Utility.negateList(AccountInReportDTO.sumAmountsOfAccounts(changesInNonDividendFinancingAssetLiabilityAccounts));
		generatedCashFlowStatement.setTotalChangesInNonDividendFinancingAssetLiabilities(totalChangesInNonDividendFinancingAssetLiabilities);
		generatedCashFlowStatement.setDividendEquityAccounts(dividendEquityAccounts);
		List<BigDecimal> totalDividendEquity = AccountInReportDTO.sumAmountsOfAccounts(dividendEquityAccounts);
		generatedCashFlowStatement.setTotalDividendEquity(totalDividendEquity);
		generatedCashFlowStatement.setDividendLiabilityAccounts(dividendLiabilityAccounts);
		List<BigDecimal> totalDividendLiabilities = AccountInReportDTO.sumAmountsOfAccounts(dividendLiabilityAccounts);
		generatedCashFlowStatement.setTotalDividendLiabilities(totalDividendLiabilities);

		generatedCashFlowStatement.setInterestExpenseAccounts(interestExpenseAccounts);
		List<BigDecimal> totalInterestExpense = AccountInReportDTO.sumAmountsOfAccounts(interestExpenseAccounts);
		generatedCashFlowStatement.setTotalInterestExpense(totalInterestExpense);
		generatedCashFlowStatement.setInterestLiabilityAccounts(interestLiabilityAccounts);
		List<BigDecimal> totalInterestLiabilities = AccountInReportDTO.sumAmountsOfAccounts(interestLiabilityAccounts);
		generatedCashFlowStatement.setTotalInterestLiabilities(totalInterestLiabilities);
		generatedCashFlowStatement.setTaxExpenseAccounts(taxExpenseAccounts);
		List<BigDecimal> totalTaxExpense = AccountInReportDTO.sumAmountsOfAccounts(taxExpenseAccounts);
		generatedCashFlowStatement.setTotalTaxExpense(totalTaxExpense);
		generatedCashFlowStatement.setTaxLiabilityAccounts(taxLiabilityAccounts);
		List<BigDecimal> totalTaxLiabilities = AccountInReportDTO.sumAmountsOfAccounts(taxLiabilityAccounts);
		generatedCashFlowStatement.setTotalTaxLiabilities(totalTaxLiabilities);
		
		List<BigDecimal> totalAdjustmentForNonOperatingIncomeExpenseNet = Utility.negateList(Utility.addLists(totalIncomeExpenseFromInvestingNet, totalIncomeExpenseFromFinancingNet));
		generatedCashFlowStatement.setTotalAdjustmentForNonOperatingIncomeExpenseNet(totalAdjustmentForNonOperatingIncomeExpenseNet);
		List<BigDecimal> totalIncomeExpenseFromOperatingNet = Utility.addLists(totalNetIncome, totalAdjustmentForNonOperatingIncomeExpenseNet);
		generatedCashFlowStatement.setTotalIncomeExpenseFromOperatingNet(totalIncomeExpenseFromOperatingNet);
		List<BigDecimal> totalAdjustmentToNetIncomeForCashOperatingIncome = Utility.addLists(totalAdjustmentForNonOperatingIncomeExpenseNet, totalNonCashOperatingIncomeExpense);
		List<BigDecimal> totalAdjustmentForChangesInOperatingAssetsLiabilitiesEquity = Utility.addLists(totalChangesInOperatingAssetsLiabilities, totalChangesInOperatingEquity);
		List<BigDecimal> totalAdjustmentToNetIncomeForOperatingCashFlow = Utility.addLists(totalAdjustmentToNetIncomeForCashOperatingIncome, totalAdjustmentForChangesInOperatingAssetsLiabilitiesEquity);
		List<BigDecimal> cashFlowFromOperations = Utility.addLists(totalNetIncome, totalAdjustmentToNetIncomeForOperatingCashFlow);
		generatedCashFlowStatement.setCashFlowFromOperations(cashFlowFromOperations);
		
		List<BigDecimal> totalAdjustmenForAssetsLiabilitiesDepreciation = Utility.addLists(totalChangesInInvestingAssetsLiabilities, totalAdjustmentForDepreciationAmortization);
		List<BigDecimal> totalAdjustmentForChangesInInvestingAssetsLiabilitiesEquity = Utility.addLists(totalAdjustmenForAssetsLiabilitiesDepreciation, totalChangesInInvestingEquity);
		List<BigDecimal> totalAdjustmentToInvestingIncomeForInvestingCashFlow = Utility.addLists(totalNonCashInvestingIncomeExpense, totalAdjustmentForChangesInInvestingAssetsLiabilitiesEquity);
		List<BigDecimal> cashFlowFromInvesting = Utility.addLists(totalIncomeExpenseFromInvestingNet, totalAdjustmentToInvestingIncomeForInvestingCashFlow);
		generatedCashFlowStatement.setCashFlowFromInvesting(cashFlowFromInvesting);
		
		List<BigDecimal> totalAdjustmentForChangesInNonDividendFinancingAssetLiabilityEquity = Utility.addLists(totalChangesInNonDividendFinancingEquity, totalChangesInNonDividendFinancingAssetLiabilities);
		List<BigDecimal> adjustmentToFinancingIncomeForFinancingCashFlowBeforeDividends = Utility.addLists(totalNonCashFinancingIncomeExpense, totalAdjustmentForChangesInNonDividendFinancingAssetLiabilityEquity);
		List<BigDecimal> totalDividendsPaid = Utility.addLists(totalDividendEquity, totalDividendLiabilities);
		generatedCashFlowStatement.setTotalDividendsPaid(totalDividendsPaid);
		List<BigDecimal> cashFlowFromFinancingExcludingDividends = Utility.addLists(totalIncomeExpenseFromFinancingNet, adjustmentToFinancingIncomeForFinancingCashFlowBeforeDividends);
		List<BigDecimal> cashFlowFromFinancing = Utility.subtractLists(cashFlowFromFinancingExcludingDividends, totalDividendsPaid);
		generatedCashFlowStatement.setCashFlowFromFinancing(cashFlowFromFinancing);
		
		List<BigDecimal> totalInterestPaid = Utility.addLists(totalInterestExpense, totalInterestLiabilities);
		List<BigDecimal> totalTaxesPaid = Utility.addLists(totalTaxExpense, totalTaxLiabilities);
		generatedCashFlowStatement.setTotalInterestPaid(totalInterestPaid);
		generatedCashFlowStatement.setTotalTaxesPaid(totalTaxesPaid);
		
		return generatedCashFlowStatement;
		
	}
	
	public IncomeStatementDTO generateIncomeStatement(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException, ConflictException {
		IncomeStatementDTO generatedIncomeStatement = new IncomeStatementDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		List<AccountInReportDTO> listOfAllAccountInReportDTOs = getListOfAccountInReportDTOBetweenDates(organizationId, dates);
		
		List<AccountInReportDTO> revenueAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> costOfSalesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> operatingExpensesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonOperatingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> interestAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> taxAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonRecurringAccounts = new ArrayList<AccountInReportDTO>();

		for (AccountInReportDTO account : listOfAllAccountInReportDTOs) {
			if (account.getIncomeStatementFormatPositionId().equals((long) 2)) {
				revenueAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 3)) {
				costOfSalesAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 4)) {
				operatingExpensesAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 5) || account.getIncomeStatementFormatPositionId().equals((long) 6) || account.getIncomeStatementFormatPositionId().equals((long) 7)) {
				nonOperatingIncomeExpenseAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 8)) {
				interestAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 9)) {
				taxAccounts.add(account);
			} else if (account.getIncomeStatementFormatPositionId().equals((long) 10)) {
				nonRecurringAccounts.add(account);
			}
		}
		
		//TODO IMPORTANT document which accounts have amounts that are debits vs which are credits
		AccountInReportDTO.negateAmountsOfAccounts(revenueAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(nonOperatingIncomeExpenseAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(nonRecurringAccounts);
		
		List<AccountSubtypeInReportDTO> operatingExpensesSubtypes = sortListOfAccountsIntoSubtypes(operatingExpensesAccounts);
		List<AccountSubtypeInReportDTO> nonOperatingIncomeExpenseSubtypes = sortListOfAccountsIntoSubtypes(nonOperatingIncomeExpenseAccounts);

		generatedIncomeStatement.setDateRanges(dates);
		generatedIncomeStatement.setRevenueAccounts(revenueAccounts);
		generatedIncomeStatement.setTotalRevenue(AccountInReportDTO.sumAmountsOfAccounts(revenueAccounts));
		generatedIncomeStatement.setCostOfSalesAccounts(costOfSalesAccounts);
		generatedIncomeStatement.setTotalCostOfSales(AccountInReportDTO.sumAmountsOfAccounts(costOfSalesAccounts));
		generatedIncomeStatement.setTotalGrossProfit(Utility.subtractLists(generatedIncomeStatement.getTotalRevenue(), generatedIncomeStatement.getTotalCostOfSales()));
		generatedIncomeStatement.setOperatingExpensesSubtypes(operatingExpensesSubtypes);
		generatedIncomeStatement.setTotalOperatingExpenses(AccountSubtypeInReportDTO.sumSubtypes(operatingExpensesSubtypes));
		generatedIncomeStatement.setTotalOperatingIncome(Utility.subtractLists(generatedIncomeStatement.getTotalGrossProfit(), generatedIncomeStatement.getTotalOperatingExpenses()));
		generatedIncomeStatement.setNonOperatingIncomeAndExpenseSubtypes(nonOperatingIncomeExpenseSubtypes);
		generatedIncomeStatement.setTotalNonOperatingIncomeAndExpenseSubtypesNet(AccountSubtypeInReportDTO.sumSubtypes(nonOperatingIncomeExpenseSubtypes));
		generatedIncomeStatement.setTotalEbit(Utility.addLists(generatedIncomeStatement.getTotalOperatingIncome(), generatedIncomeStatement.getTotalNonOperatingIncomeAndExpenseSubtypesNet()));
		generatedIncomeStatement.setInterestAccounts(interestAccounts);
		generatedIncomeStatement.setTotalInterest(AccountInReportDTO.sumAmountsOfAccounts(interestAccounts));
		List<BigDecimal> ebt = Utility.subtractLists(generatedIncomeStatement.getTotalEbit(), generatedIncomeStatement.getTotalInterest());
		generatedIncomeStatement.setTotalEarningsBeforeTax(ebt);
		generatedIncomeStatement.setTaxAccounts(taxAccounts);
		generatedIncomeStatement.setTotalTaxes(AccountInReportDTO.sumAmountsOfAccounts(taxAccounts));
		List<BigDecimal> earningsBeforeNonRecurring = Utility.subtractLists(ebt, generatedIncomeStatement.getTotalTaxes());
		generatedIncomeStatement.setNonRecurringAccounts(nonRecurringAccounts);
		generatedIncomeStatement.setTotalNonRecurringNet(AccountInReportDTO.sumAmountsOfAccounts(nonRecurringAccounts));
		generatedIncomeStatement.setNetIncome(Utility.addLists(earningsBeforeNonRecurring, generatedIncomeStatement.getTotalNonRecurringNet()));
		
		return generatedIncomeStatement;
	}
	
	public BalanceSheetDTO generateBalanceSheet(Long organizationId, List<DateRangeDTO> dates) throws ResourceNotFoundException {
		BalanceSheetDTO generatedBalanceSheet = new BalanceSheetDTO();
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));

		//fetch a list of accounts for each date range
		List<List<AccountBalanceDTO>> listsOfAccountBalancesForDates = new ArrayList<List<AccountBalanceDTO>>();
		for (DateRangeDTO dateRange : dates) {
			List<AccountBalanceDTO> accountBalancesUpToDate = accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, dateRange.getEndDate());
			listsOfAccountBalancesForDates.add(accountBalancesUpToDate);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<AccountInReportDTO> convertedList = convertListOfListOfAccountBalanceDTOsToListOfAccountInReportDTO(listsOfAccountBalancesForDates);
		//rearrange list of AccountInReportDTO to put children where they belong
		organizeChildAccountsInListOfAccounts(convertedList);
		//put accounts into correct lists in balance sheet
		List<AccountInReportDTO> currentAssetsAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonCurrentAssetsAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> currentLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> nonCurrentLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> paidInCapitalAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> shareBasedCompensationAccounts = new ArrayList<AccountInReportDTO>();
		List<AccountInReportDTO> otherEquityItemsAccounts = new ArrayList<AccountInReportDTO>();
		
		for (AccountInReportDTO account : convertedList) {
			if (account.getBalanceSheetFormatPositionId().equals((long)2)) {
				currentAssetsAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)3)) {
				nonCurrentAssetsAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)4)) {
				currentLiabilitiesAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)5)) {
				nonCurrentLiabilitiesAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)6)) {
				paidInCapitalAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)7)) {
				shareBasedCompensationAccounts.add(account);
			} else if (account.getBalanceSheetFormatPositionId().equals((long)9)) {
				otherEquityItemsAccounts.add(account);
			}
		}
		AccountInReportDTO.negateAmountsOfAccounts(currentLiabilitiesAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(nonCurrentLiabilitiesAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(paidInCapitalAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(shareBasedCompensationAccounts);
		AccountInReportDTO.negateAmountsOfAccounts(otherEquityItemsAccounts);
		
		generatedBalanceSheet.setDateRanges(dates);
		generatedBalanceSheet.setCurrentAssetsSubtypes(sortListOfAccountsIntoSubtypes(currentAssetsAccounts));
		generatedBalanceSheet.setTotalCurrentAssets(AccountSubtypeInReportDTO.sumSubtypes(generatedBalanceSheet.getCurrentAssetsSubtypes()));
		generatedBalanceSheet.setNonCurrentAssetsSubtypes(sortListOfAccountsIntoSubtypes(nonCurrentAssetsAccounts));
		generatedBalanceSheet.setTotalNonCurrentAssets(AccountSubtypeInReportDTO.sumSubtypes(generatedBalanceSheet.getNonCurrentAssetsSubtypes()));
		generatedBalanceSheet.setCurrentLiabilitiesSubtypes(sortListOfAccountsIntoSubtypes(currentLiabilitiesAccounts));
		generatedBalanceSheet.setTotalCurrentLiabilities(AccountSubtypeInReportDTO.sumSubtypes(generatedBalanceSheet.getCurrentLiabilitiesSubtypes()));
		generatedBalanceSheet.setNonCurrentLiabilitiesSubtypes(sortListOfAccountsIntoSubtypes(nonCurrentLiabilitiesAccounts));
		generatedBalanceSheet.setTotalNonCurrentLiabilities(AccountSubtypeInReportDTO.sumSubtypes(generatedBalanceSheet.getNonCurrentLiabilitiesSubtypes()));
		generatedBalanceSheet.setPaidInCapitalAccounts(paidInCapitalAccounts);
		generatedBalanceSheet.setTotalPaidInCapital(AccountInReportDTO.sumAmountsOfAccounts(paidInCapitalAccounts));
		generatedBalanceSheet.setShareBasedCompensationAccounts(shareBasedCompensationAccounts);
		generatedBalanceSheet.setTotalShareBasedCompensation(AccountInReportDTO.sumAmountsOfAccounts(shareBasedCompensationAccounts));
		generatedBalanceSheet.setOtherEquityItemsAccounts(otherEquityItemsAccounts);
		generatedBalanceSheet.setTotalOtherEquityItems(AccountInReportDTO.sumAmountsOfAccounts(otherEquityItemsAccounts));
		generatedBalanceSheet.setTotalAssets(Utility.addLists(generatedBalanceSheet.getTotalCurrentAssets(), generatedBalanceSheet.getTotalNonCurrentAssets()));
		generatedBalanceSheet.setTotalLiabilities(Utility.addLists(generatedBalanceSheet.getTotalCurrentLiabilities(), generatedBalanceSheet.getTotalNonCurrentLiabilities()));
		
		//get end dates for prev periods and start dates for curr periods using fiscal year begin date
		List<LocalDate> previousPeriodEndDates = new ArrayList<LocalDate>();
		List<LocalDate> currentPeriodStartDates = new ArrayList<LocalDate>();
		
		LocalDate fiscalYearEnd = organization.getFiscalYearBegin().minusDays(1);
		
		for (DateRangeDTO dateRangeDto : dates) {
			LocalDate previousFiscalYearEnd;
			if (fiscalYearEnd.withYear(dateRangeDto.getEndDate().getYear()).compareTo(dateRangeDto.getEndDate()) >= 0) {
				previousFiscalYearEnd = fiscalYearEnd.withYear(dateRangeDto.getEndDate().getYear() -1);
			} else {
				previousFiscalYearEnd = fiscalYearEnd.withYear(dateRangeDto.getEndDate().getYear());
			}
			LocalDate currentFiscalYearBegin = previousFiscalYearEnd.plusDays(1);
			previousPeriodEndDates.add(previousFiscalYearEnd);
			currentPeriodStartDates.add(currentFiscalYearBegin);
		}
		generatedBalanceSheet.setPreviousPeriodEndDates(previousPeriodEndDates);
		generatedBalanceSheet.setCurrentPeriodStartDates(currentPeriodStartDates);
		
		//calculate retained earnings
		List<BigDecimal> initialRetainedEarnings = new ArrayList<BigDecimal>();
		for (DateRangeDTO date : dates) {
			initialRetainedEarnings.add(organization.getInitialRetainedEarnings());
		}
		//get previous period net income
		List<BigDecimal> previousPeriodNetIncome = new ArrayList<BigDecimal>();
		for (LocalDate endDate : previousPeriodEndDates) {
			previousPeriodNetIncome.add(getNetIncomeForOrganizationBetweenDates(organizationId, LocalDate.parse("0000-01-01"), endDate));
		}
		generatedBalanceSheet.setNetIncomePreviousPeriod(previousPeriodNetIncome);
		
		//get previous period dividends
		List<List<AccountBalanceDTO>> listsOfPrevPeriodAccountBalancesForDates = new ArrayList<List<AccountBalanceDTO>>();
		for (LocalDate date : previousPeriodEndDates) {
			List<AccountBalanceDTO> accountBalancesUpToDate = accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, date);
			listsOfPrevPeriodAccountBalancesForDates.add(accountBalancesUpToDate);
		}
		List<AccountInReportDTO> convertedListOfPrevPeriodAccounts = convertListOfListOfAccountBalanceDTOsToListOfAccountInReportDTO(listsOfPrevPeriodAccountBalancesForDates);
		organizeChildAccountsInListOfAccounts(convertedListOfPrevPeriodAccounts);
		List<AccountInReportDTO> dividendsAndEquivalentsAccountsPreviousPeriod = new ArrayList<AccountInReportDTO>();
		for (AccountInReportDTO account : convertedListOfPrevPeriodAccounts) {
			if (account.getBalanceSheetFormatPositionId().equals((long)8)) {
				dividendsAndEquivalentsAccountsPreviousPeriod.add(account);
			}
		}
		generatedBalanceSheet.setDividendsAndEquivalentsAccountsPreviousPeriod(dividendsAndEquivalentsAccountsPreviousPeriod);
		List<BigDecimal> totalDividendsAndEquivalentsPreviousPeriod = AccountInReportDTO.sumAmountsOfAccounts(dividendsAndEquivalentsAccountsPreviousPeriod);
		generatedBalanceSheet.setTotalDividendsAndEquivalentsPreviousPeriod(totalDividendsAndEquivalentsPreviousPeriod);
		
		//get current Period Net Income
		List<BigDecimal> currentPeriodNetIncome = new ArrayList<BigDecimal>();
		for (int i = 0; i < dates.size(); i++) {
			currentPeriodNetIncome.add(getNetIncomeForOrganizationBetweenDates(organizationId, currentPeriodStartDates.get(i), dates.get(i).getEndDate()));
		}
		generatedBalanceSheet.setNetIncomeCurrentPeriod(currentPeriodNetIncome);
		
		//get current period dividends
		List<List<AccountDTO>> listsOfCurrPeriodAccountBalancesForDates = new ArrayList<List<AccountDTO>>();
		for (int i = 0; i < dates.size(); i++) {
			List<AccountDTO> accountBalancesUpToDate = accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, currentPeriodStartDates.get(i), dates.get(i).getEndDate());
			listsOfCurrPeriodAccountBalancesForDates.add(accountBalancesUpToDate);
		}
		List<AccountInReportDTO> convertedListOfCurrPeriodAccounts = convertListOfListOfAccountDTOsToListOfAccountInReportDTO(listsOfCurrPeriodAccountBalancesForDates);
		organizeChildAccountsInListOfAccounts(convertedListOfCurrPeriodAccounts);
		List<AccountInReportDTO> dividendsAndEquivalentsAccountsCurrentPeriod = new ArrayList<AccountInReportDTO>();
		for (AccountInReportDTO account : convertedListOfCurrPeriodAccounts) {
			if (account.getBalanceSheetFormatPositionId().equals((long)8)) {
				dividendsAndEquivalentsAccountsCurrentPeriod.add(account);
			}
		}
		AccountInReportDTO.negateAmountsOfAccounts(dividendsAndEquivalentsAccountsCurrentPeriod);
		generatedBalanceSheet.setDividendsAndEquivalentsAccountsCurrentPeriod(dividendsAndEquivalentsAccountsCurrentPeriod);
		List<BigDecimal> totalDividendsAndEquivalentsCurrentPeriod = AccountInReportDTO.sumAmountsOfAccounts(dividendsAndEquivalentsAccountsCurrentPeriod);
		generatedBalanceSheet.setTotalDividendsAndEquivalentsCurrentPeriod(totalDividendsAndEquivalentsCurrentPeriod);
		
		//calculate retained earnings
		List<BigDecimal> retainedEarningsBeginningBalances = Utility.addLists(initialRetainedEarnings, Utility.subtractLists(previousPeriodNetIncome, totalDividendsAndEquivalentsPreviousPeriod));
		generatedBalanceSheet.setRetainedEarningsBeginningBalances(retainedEarningsBeginningBalances);
		List<BigDecimal> retainedEarningsEndingBalances = Utility.addLists(retainedEarningsBeginningBalances, Utility.addLists(currentPeriodNetIncome, totalDividendsAndEquivalentsCurrentPeriod));
		generatedBalanceSheet.setRetainedEarningsEndingBalances(retainedEarningsEndingBalances);
		
		List<BigDecimal> capitalPlusShareCompensation = Utility.addLists(generatedBalanceSheet.getTotalPaidInCapital(), generatedBalanceSheet.getTotalShareBasedCompensation());
		List<BigDecimal> equityBeforeRetainedEarnings = Utility.addLists(generatedBalanceSheet.getTotalOtherEquityItems(), capitalPlusShareCompensation);
		List<BigDecimal> totalEquity = Utility.addLists(retainedEarningsEndingBalances, equityBeforeRetainedEarnings);
		generatedBalanceSheet.setTotalEquity(totalEquity);
		
		return generatedBalanceSheet;
	}
	
	public BigDecimal getNetIncomeForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		return organizationRepo.getTotalIncomeForOrganizationBetweenDates(organizationId, startDate, endDate)
				.subtract(organizationRepo.getTotalExpensesForOrganizationBetweenDates(organizationId, startDate, endDate));
	}
	
	public List<AccountSubtypeInReportDTO> sortListOfAccountsIntoSubtypes(List<AccountInReportDTO> listOfAccounts) {
		List<AccountSubtypeInReportDTO> returnList = new ArrayList<AccountSubtypeInReportDTO>();
		for (AccountInReportDTO account : listOfAccounts) {
			int indexOfAccountSubtypeId = findIndexOfAccountSubtypeByIdInListOfDtos(account.getAccountSubtypeId(), returnList);
			if (indexOfAccountSubtypeId == -1) {
				AccountSubtypeInReportDTO newSubtype = new AccountSubtypeInReportDTO(account.getAccountSubtypeId(), account.getAccountSubtypeName());
				newSubtype.getAccounts().add(account);
				returnList.add(newSubtype);
			} else {
				returnList.get(indexOfAccountSubtypeId).getAccounts().add(account);
			}
		}
		//sum accounts for each subtype
		for (AccountSubtypeInReportDTO subtype : returnList) {
			subtype.setTotalDebitsMinusCredits(AccountInReportDTO.sumAmountsOfAccounts(subtype.getAccounts()));
		}
		//sort by accountsubtypeid?
		return returnList;
	}
	
	//takes an accountSubtypeId and a list of AccountSubtypeReportDTOs. If any AccountSubtypeDTOs exist for this accountSubtypeId,
	//return the index of that AccountSubtypeDTO in the list. If none are found, return 0.
	public int findIndexOfAccountSubtypeByIdInListOfDtos(Long accountSubtypeId, List<AccountSubtypeInReportDTO> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getAccountSubtypeId().equals(accountSubtypeId)) {
				return i;
			}
		}
		return -1;
	}
	
	/* Takes an organizationId and a list of DateRangeDTOs. Returns a list of AccountInReportDTO, with amounts that reflect the cumulative
	 * activity of the account up until the endDate of the provided DateRangeDTOs, including account initial values.
	 * Same as the below method, but only uses the endDate of the DateRangeDTOs, and includes account initial values. */
	public List<AccountInReportDTO> getListOfAccountInReportDTOUpToDate(Long organizationId, List<DateRangeDTO> dates) {
		//fetch a list of accounts for each date range
		List<List<AccountBalanceDTO>> listsOfAccountBalancesForDates = new ArrayList<List<AccountBalanceDTO>>();
		for (DateRangeDTO dateRange : dates) {
			List<AccountBalanceDTO> accountBalancesUpToDate = accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, dateRange.getEndDate());
			listsOfAccountBalancesForDates.add(accountBalancesUpToDate);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<AccountInReportDTO> convertedList = convertListOfListOfAccountBalanceDTOsToListOfAccountInReportDTO(listsOfAccountBalancesForDates);
		//rearrange list of AccountInReportDTO to put children where they belong
		organizeChildAccountsInListOfAccounts(convertedList);
		return convertedList;
	}
	
	/* Takes an organizationId and a list of DateRangeDTOs. Returns a list of AccountInReportDTO, with amounts that reflect the startDate and endDate
	 * of the provided DateRangeDTOs. Same as the above method, but uses both the startDate and endDate of the provided DateRangeDTOs, and does NOT
	 * include account initial values. */
	public List<AccountInReportDTO> getListOfAccountInReportDTOBetweenDates(Long organizationId, List<DateRangeDTO> dates) throws ConflictException {
		//fetch a list of accounts for each date range
		List<List<AccountDTO>> listsOfAccountBalancesForDates = new ArrayList<List<AccountDTO>>();
		for (DateRangeDTO dateRange : dates) {
			if (dateRange.getStartDate() == null) {
				throw new ConflictException("StartDate is required.");
			}
			List<AccountDTO> accountBalancesBetweenDates = accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, dateRange.getStartDate(), dateRange.getEndDate());
			listsOfAccountBalancesForDates.add(accountBalancesBetweenDates);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<AccountInReportDTO> convertedList = convertListOfListOfAccountDTOsToListOfAccountInReportDTO(listsOfAccountBalancesForDates);
		//rearrange list of AccountInReportDTO to put children where they belong
		organizeChildAccountsInListOfAccounts(convertedList);
		return convertedList;
	}
	
	
	
	//rearrange list of AccountInReportDTO to put children where they belong
	public void organizeChildAccountsInListOfAccounts(List<AccountInReportDTO> list) {
		for (AccountInReportDTO potentialParentAccount : list) {
			if (potentialParentAccount.isHasChildren()) {
				for (AccountInReportDTO potentialChildAccount : list) {
					if (potentialChildAccount.getParentAccountId() != null && potentialChildAccount.getParentAccountId().equals(potentialParentAccount.getAccountId())) {
						potentialParentAccount.getChildren().add(potentialChildAccount);
					}
				}
			}
		}
		for (int i = list.size() - 1; i >= 0; --i) {
	        if(list.get(i).getParentAccountId() != null) {
	        	list.remove(i);
	        }
		}
		for (AccountInReportDTO topLevelAccount : list) {
			if (topLevelAccount.isHasChildren()) {
				topLevelAccount.setAmounts(AccountInReportDTO.sumAmountsOfAccounts(topLevelAccount.getChildren()));
			}
		}
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
	// same as above, but for AccountDTO
	public List<AccountInReportDTO> convertListOfListOfAccountDTOsToListOfAccountInReportDTO(List<List<AccountDTO>> lists) {
		List<AccountInReportDTO> returnedList = new ArrayList<AccountInReportDTO>();
		//if the input list of lists is not empty, use the first list to populate returnedList with the correct number of AccountInReportDTO.
		if (lists.size() > 0) {
			for (AccountDTO account : lists.get(0)) {
				AccountInReportDTO createdAccountInReportDTO = new AccountInReportDTO(account);
				returnedList.add(createdAccountInReportDTO);
			}
		}
		//iterate through lists in order to add amount values to AccountInReportDTOs
		for (List<AccountDTO> list : lists) {
			for (int i = 0; i < list.size(); i++) {
				//this is ugly, sorry. takes the AccountDTO at index i in list, and appends its debitsMinusCredits to 'amounts' list in the AccountInReportDTO at index i in returnedList
				returnedList.get(i).getAmounts().add(list.get(i).getDebitsMinusCredits());
			}
		}
		return returnedList;
	}
	
	//similar to above
	public List<VendorExpensesInReportDTO> getListOfVendorExpensesInReportDTOBetweenDates(Long organizationId, List<DateRangeDTO> dates) throws ConflictException {
		//fetch a list of accounts for each date range
		List<List<VendorExpensesDTO>> listsOfVendorExpensesDTOs = new ArrayList<List<VendorExpensesDTO>>();
		for (DateRangeDTO dateRange : dates) {
			if (dateRange.getStartDate() == null) {
				throw new ConflictException("StartDate is required.");
			}
			List<VendorExpensesDTO> vendorExpensesBetweenDates = vendorRepo.getExpensesByVendorForOrganizationBetweenDates(organizationId, dateRange.getStartDate(), dateRange.getEndDate());
			listsOfVendorExpensesDTOs.add(vendorExpensesBetweenDates);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<VendorExpensesInReportDTO> convertedList = convertListOfListOfVendorExpensesDTOsToListOfVendorExpensesInReportDTO(listsOfVendorExpensesDTOs);
		return convertedList;
	}
	public List<VendorExpensesInReportDTO> convertListOfListOfVendorExpensesDTOsToListOfVendorExpensesInReportDTO(List<List<VendorExpensesDTO>> lists) {
		List<VendorExpensesInReportDTO> returnedList = new ArrayList<VendorExpensesInReportDTO>();
		if (lists.size() > 0) {
			for (VendorExpensesDTO vendor : lists.get(0)) {
				VendorExpensesInReportDTO createdVendorExpensesInReportDTO = new VendorExpensesInReportDTO(vendor);
				returnedList.add(createdVendorExpensesInReportDTO);
			}
		}
		for (List<VendorExpensesDTO> list : lists) {
			for (int i = 0; i < list.size(); i++) {
				returnedList.get(i).getAmounts().add(list.get(i).getDebitsMinusCredits());
			}
		}
		return returnedList;
	}
	public List<CustomerIncomeInReportDTO> getListOfCustomerIncomeInReportDTOBetweenDates(Long organizationId, List<DateRangeDTO> dates) throws ConflictException {
		//fetch a list of accounts for each date range
		List<List<CustomerIncomeDTO>> listsOfCustomerIncomeDTOs = new ArrayList<List<CustomerIncomeDTO>>();
		for (DateRangeDTO dateRange : dates) {
			if (dateRange.getStartDate() == null) {
				throw new ConflictException("StartDate is required.");
			}
			List<CustomerIncomeDTO> customerIncomeBetweenDates = customerRepo.getIncomeByCustomerForOrganizationBetweenDates(organizationId, dateRange.getStartDate(), dateRange.getEndDate());
			listsOfCustomerIncomeDTOs.add(customerIncomeBetweenDates);
		}
		//convert list of list of accounts into list of AccountInReportDTO
		List<CustomerIncomeInReportDTO> convertedList = convertListOfListOfCustomerIncomeDTOsToListOfCustomerIncomeInReportDTO(listsOfCustomerIncomeDTOs);
		return convertedList;
	}
	public List<CustomerIncomeInReportDTO> convertListOfListOfCustomerIncomeDTOsToListOfCustomerIncomeInReportDTO(List<List<CustomerIncomeDTO>> lists) {
		List<CustomerIncomeInReportDTO> returnedList = new ArrayList<CustomerIncomeInReportDTO>();
		if (lists.size() > 0) {
			for (CustomerIncomeDTO customer : lists.get(0)) {
				CustomerIncomeInReportDTO createdDTO = new CustomerIncomeInReportDTO(customer);
				returnedList.add(createdDTO);
			}
		}
		for (List<CustomerIncomeDTO> list : lists) {
			for (int i = 0; i < list.size(); i++) {
				returnedList.get(i).getAmounts().add(list.get(i).getCreditsMinusDebits());
			}
		}
		return returnedList;
	}
}
