export interface PhoneValidationResult {
  isValid: boolean;
  formatted: string;
  type: 'mobile' | 'landline' | 'voip' | 'toll-free' | 'unknown';
  isVoipOrTollFree: boolean;
  carrier: string;
}

export function validatePhone(phone: string, country?: string): PhoneValidationResult {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const countryLower = (country || '').toLowerCase();
  
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return {
      isValid: false,
      formatted: phone,
      type: 'unknown',
      isVoipOrTollFree: false,
      carrier: 'Invalid length'
    };
  }

  // Handle US/Canada (+1) numbers
  const isUSOrCanada = countryLower.includes('canada') || 
                      countryLower.includes('united states') || 
                      countryLower.includes('us') || 
                      phone.startsWith('+1') ||
                      (cleanPhone.length === 10 && !phone.startsWith('+')) ||
                      (cleanPhone.length === 11 && cleanPhone.startsWith('1'));

  if (isUSOrCanada) {
    let digits = cleanPhone;
    while (digits.length > 10 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }
    
    if (digits.length !== 10) {
      return {
        isValid: false,
        formatted: phone,
        type: 'unknown',
        isVoipOrTollFree: false,
        carrier: 'Invalid North American length'
      };
    }

    const areaCode = digits.slice(0, 3);
    const exchangeCode = digits.slice(3, 6);
    
    // N11 or area/exchange starting with 0 or 1 are invalid in NANP
    if (areaCode.startsWith('0') || areaCode.startsWith('1') || exchangeCode.startsWith('0') || exchangeCode.startsWith('1')) {
      return {
        isValid: false,
        formatted: phone,
        type: 'unknown',
        isVoipOrTollFree: false,
        carrier: 'Invalid NANP area/exchange code'
      };
    }

    const formatted = `+1 (${areaCode}) ${exchangeCode}-${digits.slice(6)}`;
    
    // Detect toll-free numbers
    const tollFreeAreaCodes = ['800', '888', '877', '866', '855', '844', '833'];
    if (tollFreeAreaCodes.includes(areaCode)) {
      return {
        isValid: true,
        formatted,
        type: 'toll-free',
        isVoipOrTollFree: true,
        carrier: 'Toll-Free Service'
      };
    }

    // Detect known virtual/VOIP area codes or virtual exchanges
    const virtualAreaCodes = ['500', '700', '900'];
    if (virtualAreaCodes.includes(areaCode)) {
      return {
        isValid: true,
        formatted,
        type: 'voip',
        isVoipOrTollFree: true,
        carrier: 'Virtual/VOIP Carrier'
      };
    }

    // Default to mobile/landline check. Since we can't separate without API, return mobile/landline as type.
    return {
      isValid: true,
      formatted,
      type: 'mobile', // Assumed standard B2B line
      isVoipOrTollFree: false,
      carrier: 'Standard NANP Line'
    };
  }

  // International numbers
  const formatted = `+${cleanPhone}`;
  return {
    isValid: true,
    formatted,
    type: 'unknown',
    isVoipOrTollFree: false,
    carrier: 'International Line'
  };
}
