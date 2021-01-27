package com.easyledger.api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountGroupBalanceDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.viewmodel.BalanceSheetAssetsViewModel;
import com.easyledger.api.viewmodel.BalanceSheetEquityViewModel;
import com.easyledger.api.viewmodel.BalanceSheetLiabilitiesViewModel;
import com.easyledger.api.viewmodel.BalanceSheetViewModel;
import com.easyledger.api.viewmodel.IncomeStatementViewModel;

@Service
public class ReportsService {
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private AccountGroupRepository accountGroupRepo;
	
	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	
	
	public ReportsService(AccountRepository accountRepo, AccountGroupRepository accountGroupRepo,
			AccountSubtypeRepository accountSubtypeRepo) {
		super();
		this.accountRepo = accountRepo;
		this.accountGroupRepo = accountGroupRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
	}



	public BalanceSheetViewModel getBalanceSheetViewModelForOrganizationUpToDate(Long organizationId, LocalDate endDate) {
		BalanceSheetViewModel generatedBalanceSheet = new BalanceSheetViewModel();
		generatedBalanceSheet.setOrganizationId(organizationId);
		generatedBalanceSheet.setAsOfDate(endDate);
		generatedBalanceSheet.setAccountBalances(accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, endDate));
		generatedBalanceSheet.setAccountGroupBalances(accountGroupRepo.getAllAccountGroupBalancesForOrganizationUpToDate(organizationId, endDate));
		
		LocalDate prevYearEnd = LocalDate.parse((endDate.getYear() - 1) + "-12-31");
		LocalDate currYearStart = LocalDate.parse(endDate.getYear() + "-01-01");
		generatedBalanceSheet.setPrevPeriodEndDate(prevYearEnd);
		generatedBalanceSheet.setCurrPeriodStartDate(currYearStart);
		
		List<AccountSubtypeBalanceDTO> totalAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, endDate);
		List<AccountSubtypeBalanceDTO> prevPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, prevYearEnd);
		List<AccountSubtypeBalanceDTO> currPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, currYearStart, endDate);
		
		generatedBalanceSheet.setBalanceSheetAssets(new BalanceSheetAssetsViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetLiabilities(new BalanceSheetLiabilitiesViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetEquity(new BalanceSheetEquityViewModel(prevPeriodAccountSubtypeBalances, currPeriodAccountSubtypeBalances, totalAccountSubtypeBalances));
		return generatedBalanceSheet;
	}
	
	public IncomeStatementViewModel getIncomeStatementViewModelForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate) {
		List<AccountSubtypeBalanceDTO> accountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		List<AccountGroupBalanceDTO> accountGroupBalances = accountGroupRepo.getAllAccountGroupBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		List<AccountBalanceDTO> accountBalances = accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
		
		return new IncomeStatementViewModel(accountSubtypeBalances, accountGroupBalances, accountBalances, startDate, endDate);
	}
	

}
