package com.easyledger.api.dto;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BalanceSheetDTO {
	private List<LocalDate> dates = new ArrayList<LocalDate>();
	private List<AccountInReportDTO> currentAssets;
	private List<BigInteger> totalCurrentAssets;
	private List<AccountInReportDTO> nonCurrentAssets;
}
