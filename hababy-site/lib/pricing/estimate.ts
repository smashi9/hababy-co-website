export type EstimateProduct = {
  daily_price_mad: number;
  weekly_price_mad: number;
  deposit_mad: number;
};

export type RentalEstimate = {
  rentalDays: number;
  rentalSubtotalMad: number;
  depositMad: number;
  deliveryFeeMad: number;
  urgentFeeMad: number;
  totalDueMad: number;
};

export function getRentalDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 0;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / dayMs) + 1;
}

export function calculateRentalEstimate(
  product: EstimateProduct,
  startDate: string,
  endDate: string
): RentalEstimate {
  const rentalDays = getRentalDays(startDate, endDate);

  if (rentalDays <= 0) {
    return {
      rentalDays: 0,
      rentalSubtotalMad: 0,
      depositMad: product.deposit_mad,
      deliveryFeeMad: 0,
      urgentFeeMad: 0,
      totalDueMad: product.deposit_mad,
    };
  }

  const weeklyBlocks = Math.floor(rentalDays / 7);
  const extraDays = rentalDays % 7;
  const rentalSubtotalMad =
    weeklyBlocks > 0
      ? weeklyBlocks * product.weekly_price_mad + extraDays * product.daily_price_mad
      : rentalDays * product.daily_price_mad;
  const depositMad = product.deposit_mad;
  const deliveryFeeMad = 0;
  const urgentFeeMad = 0;

  return {
    rentalDays,
    rentalSubtotalMad,
    depositMad,
    deliveryFeeMad,
    urgentFeeMad,
    totalDueMad: rentalSubtotalMad + depositMad + deliveryFeeMad + urgentFeeMad,
  };
}
