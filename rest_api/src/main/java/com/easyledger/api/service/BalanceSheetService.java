package com.easyledger.api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.viewmodel.BalanceSheetAssetsViewModel;
import com.easyledger.api.viewmodel.BalanceSheetEquityViewModel;
import com.easyledger.api.viewmodel.BalanceSheetLiabilitiesViewModel;
import com.easyledger.api.viewmodel.BalanceSheetViewModel;

@Service
public class BalanceSheetService {
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private AccountGroupRepository accountGroupRepo;
	
	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	
	
	public BalanceSheetService(AccountRepository accountRepo, AccountGroupRepository accountGroupRepo,
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
		
		List<AccountSubtypeBalanceDTO> totalAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, endDate);
		List<AccountSubtypeBalanceDTO> prevPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, prevYearEnd);
		List<AccountSubtypeBalanceDTO> currPeriodAccountSubtypeBalances = accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, currYearStart, endDate);
		
		generatedBalanceSheet.setBalanceSheetAssets(new BalanceSheetAssetsViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetLiabilities(new BalanceSheetLiabilitiesViewModel(totalAccountSubtypeBalances));
		generatedBalanceSheet.setBalanceSheetEquity(new BalanceSheetEquityViewModel(prevPeriodAccountSubtypeBalances, currPeriodAccountSubtypeBalances, totalAccountSubtypeBalances));
		return generatedBalanceSheet;
	}

}
