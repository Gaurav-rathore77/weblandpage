export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function validateIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return true;
  if (cleaned.length === 12 && cleaned.startsWith('91')) return true;
  if (cleaned.length === 11 && cleaned.startsWith('0')) return true;
  return false;
}

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
