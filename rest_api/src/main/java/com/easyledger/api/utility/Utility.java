package com.easyledger.api.utility;

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
}
