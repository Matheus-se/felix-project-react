import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const baseUrl = new URL(
	'https://67a6a167510789ef0dfbd803.mockapi.io/api/v1/transactions?sortBy=date&order=asc&l=20&'
);
