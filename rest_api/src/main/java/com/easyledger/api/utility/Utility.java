package com.easyledger.api.utility;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public final class Utility {
	
	private Utility() {	
	}
	
	public static String trimString(String string, int maxLength) {
		String trimmedString = string.trim();
		if (trimmedString.length() <= maxLength) {
			return trimmedString;
		} else {
			return trimmedString.substring(0, maxLength);
		}
	}
	
	public static List<BigDecimal> addLists(List<BigDecimal> list1, List<BigDecimal> list2) {
		ArrayList<BigDecimal> returnedList = new ArrayList<BigDecimal>();
		List<BigDecimal> largerList;
		List<BigDecimal> smallerList;
		if (list1.size() >= list2.size()) {
			largerList = list1;
			smallerList = list2;
		} else {
			largerList = list2;
			smallerList = list1;
		}
		for (int i = 0; i < largerList.size(); i++) {
			if (i >= smallerList.size()) {
				returnedList.add(largerList.get(i));
			} else {
				returnedList.add(largerList.get(i).add(smallerList.get(i)));
			}
		}
		return returnedList;
	}
	
	public static List<BigDecimal> subtractLists(List<BigDecimal> list1, List<BigDecimal> list2) {
		ArrayList<BigDecimal> returnedList = new ArrayList<BigDecimal>();
		List<BigDecimal> largerList;
		List<BigDecimal> smallerList;
		if (list1.size() >= list2.size()) {
			largerList = list1;
			smallerList = list2;
		} else {
			largerList = list2;
			smallerList = list1;
		}
		for (int i = 0; i < largerList.size(); i++) {
			if (i >= smallerList.size()) {
				smallerList.add(new BigDecimal(0));
			}
			returnedList.add(list1.get(i).subtract(list2.get(i)));
			
		}
		return returnedList;
	}
	
	public static List<BigDecimal> negateList(List<BigDecimal> list) {
		List<BigDecimal> returnedList = new ArrayList<BigDecimal>();
		for (BigDecimal bigDecimal : list) {
			returnedList.add(bigDecimal.negate());
		}
		return returnedList;
	}
}
