package com.easyledger.api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.BalanceSheetDTO;
import com.easyledger.api.dto.CashFlowStatementDTO;
import com.easyledger.api.dto.DateRangeDTO;
import com.easyledger.api.dto.IncomeStatementDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.ReportsService;
import com.easyledger.api.viewmodel.AccountTransactionsReportViewModel;
import com.easyledger.api.viewmodel.BalanceSheetViewModel;
import com.easyledger.api.viewmodel.CashFlowStatementViewModel;
import com.easyledger.api.viewmodel.ExpensesByVendorReportViewModel;
import com.easyledger.api.viewmodel.IncomeByCustomerReportViewModel;
import com.easyledger.api.viewmodel.IncomeStatementViewModel;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class ReportsController {
	private ReportsService reportsService;
	private AuthorizationService authorizationService;
	private AccountRepository accountRepo;
	
    public ReportsController(ReportsService reportsService, AuthorizationService authorizationService, AccountRepository accountRepo) {
		super();
		this.reportsService = reportsService;
		this.authorizationService = authorizationService;
		this.accountRepo = accountRepo;
	}

	@Deprecated
	@GetMapping("/organization/{id}/reports/balanceSheet/{endDate}") 
	public BalanceSheetViewModel getBalanceSheetViewModelForOrganizationUpToDate(@PathVariable(value = "id") Long organizationId, 
    		@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.getBalanceSheetViewModelForOrganizationUpToDate(organizationId, endDate);
	}
	
	//We use post just to make life a little easier when dealing with arrays of dates in the request body
	@PostMapping("/organization/{id}/reports/balanceSheet") 
	public BalanceSheetDTO getBalanceSheetDtoForOrganizationWithDates(@PathVariable(value = "id") Long organizationId, 
    		@RequestBody List<DateRangeDTO> dates, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.generateBalanceSheet(organizationId, dates);
	}
	
	@PostMapping("/organization/{id}/reports/incomeStatement") 
	public IncomeStatementDTO getIncomeStatementDtoForOrganizationWithDates(@PathVariable(value = "id") Long organizationId, 
    		@RequestBody List<DateRangeDTO> dates, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException, ConflictException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.generateIncomeStatement(organizationId, dates);
	}
	
	@Deprecated
	@GetMapping("/organization/{id}/reports/incomeStatement/{startDate}/{endDate}") 
	public IncomeStatementViewModel getIncomeStatementViewModelForOrganizationBetweenDates(@PathVariable(value = "id") Long organizationId,
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
			throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.getIncomeStatementViewModelForOrganizationBetweenDates(organizationId, startDate, endDate);
	}

	@Deprecated
	@GetMapping("/organization/{id}/reports/cashFlow/{startDate}/{endDate}")
	public CashFlowStatementViewModel getCashFlowStatementViewModelForOrganizationBetweenDates(@PathVariable(value = "id") Long organizationId,
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
			throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.getCashFlowStatementViewModelForOrganizationBetweenDates(organizationId, startDate, endDate);
	}
	
	@PostMapping("/organization/{id}/reports/cashFlowStatement") 
	public CashFlowStatementDTO getCashFlowStatementDtoForOrganizationWithDates(@PathVariable(value = "id") Long organizationId, 
    		@RequestBody List<DateRangeDTO> dates, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException, ConflictException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.generateCashFlowStatement(organizationId, dates);
	}
	
	@GetMapping("/reports/accountTransactionsReport/account/{accountId}/{startDate}/{endDate}")
	public AccountTransactionsReportViewModel getAccountTransactionsReportForAccountBetweenDates(@PathVariable(value = "accountId") Long accountId,
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
			throws ResourceNotFoundException, UnauthorizedException {
		Account account = accountRepo.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, account.getOrganization().getId());
		return reportsService.getAccountTransactionsReportViewModelForAccountBetweenDates(accountId, startDate, endDate);
	}
	
	@GetMapping("/reports/expensesByVendorReport/organization/{organizationId}/{startDate}/{endDate}")
	public ExpensesByVendorReportViewModel getExpensesByVendorReportForOrganizationBetweenDates(@PathVariable(value = "organizationId") Long organizationId,
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.getExpensesByVendorReportViewModelForOrganizationBetweenDates(organizationId, startDate, endDate);
	}
	
	@GetMapping("/reports/incomeByCustomerReport/organization/{organizationId}/{startDate}/{endDate}")
	public IncomeByCustomerReportViewModel getIncomeByCustomerReportForOrganizationBetweenDates(@PathVariable(value = "organizationId") Long organizationId,
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return reportsService.getIncomeByCustomerReportViewModelForOrganizationBetweenDates(organizationId, startDate, endDate);
	}
	
}
