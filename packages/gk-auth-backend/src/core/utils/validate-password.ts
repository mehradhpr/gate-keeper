import { PasswordPolicyOptions } from '../interfaces.js';
import { PasswordPolicyError } from '../errors.js';

export function validatePassword(password: string, policy?: PasswordPolicyOptions): void {
    if (!policy) return;

    // Length check
    if (policy.minLength && password.length < policy.minLength) {
        throw new PasswordPolicyError(
            `Password must be at least ${policy.minLength} characters`
        );
    }

    // Character type checks
    const counts = {
        lower: (password.match(/[a-z]/g) || []).length,
        upper: (password.match(/[A-Z]/g) || []).length,
        number: (password.match(/[0-9]/g) || []).length,
        symbol: (password.match(/[^a-zA-Z0-9]/g) || []).length
    };

    if (policy.minLowercase && counts.lower < policy.minLowercase) {
        throw new PasswordPolicyError(
            `Password must contain at least ${policy.minLowercase} lowercase letters`
        );
    }

    if (policy.minUppercase && counts.upper < policy.minUppercase) {
        throw new PasswordPolicyError(
            `Password must contain at least ${policy.minUppercase} uppercase letters`
        );
    }

    if (policy.minNumbers && counts.number < policy.minNumbers) {
        throw new PasswordPolicyError(
            `Password must contain at least ${policy.minNumbers} numbers`
        );
    }

    if (policy.minSymbols && counts.symbol < policy.minSymbols) {
        throw new PasswordPolicyError(
            `Password must contain at least ${policy.minSymbols} symbols`
        );
    }
}