export interface ProductInterface {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export function capitalizeWord(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

