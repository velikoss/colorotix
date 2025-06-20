

export function formatNumber(num: any) {
    if (num === null || num === undefined || isNaN(num)) return '0';

    const absNum = Math.abs(num);
    let formatted;

    if (absNum >= 1000000000) {
        formatted = (num / 1000000000).toFixed(1) + 'Ч';
    } else if (absNum >= 1000000) {
        formatted = (num / 1000000).toFixed(1) + 'М';
    } else if (absNum >= 1000) {
        formatted = (num / 1000).toFixed(1) + 'Т';
    } else {
        formatted = num.toString();
    }

   
    formatted = formatted.replace(/\.0([kmb])/, '1');

    return formatted;
}

export const translations = {
    'gov_number': 'Номер транспортного средства',
    'driver': 'Водитель',
    'vehicle_type': 'Тип транспортного средства',
    'release_year': 'Год выпуска',
    'mileage': 'Пробег',
    'last_repair_date': 'Дата последнего ремонта',
    'industry': 'Отрасль',
    'fuel_consumption': 'Расход Топлива',
    'trailer': 'Есть прицеп',
    'date': 'Дата',
    'fuel': 'Расходы на топливо',
    'repair': 'Расходы на ремонт',
    'insurance': 'Расходы на страховку',
    'fines': 'Расходы на штрафы',
    'maintenance': 'Расходы на ТО',
    'tire_service': 'Расходы на шиномонтаж',
    'carwash': 'Расходы на автомойку',
    'parking': 'Расходы на стоянку',
    'flat_roads': 'Расходы на платные дороги',
    'daily_distance': 'Дневной пробег',
    'calculated_salary': 'Заработная плата',
    'antifreeze_liquid': 'Расходы на антифриз',
    'engine_oil': 'Расходы на моторные масла',
    'brake_fluid': 'расходы на тормозные жилкости',
    'spark_plugs': 'Расходы на свечи зажигания',
    'fuel_filters': 'Расходы на топливные фильтры',
    'filters': 'Расходы на масляные, воздушные и салонные фильтры',
    'timing_belts': 'Расходы на ремни ГРМ',
    'brake_pads': 'Расходы на тормозные колодки',
    'other_cost': 'Прочие расходы',
    'rental_expense': 'Расходы на арендованный транспорт',
    'amortization': 'Расходы на амортизацию',
    'transport_tax': 'Расходы на транспортные налоги',
    'casco': 'Расходы на КАСКО',
    'fire_extinguishers': 'Расходы на порошковые огнетушители',
    'first_aid_kits': 'Расходы на автомобильные аптечки первой помощи',
    'hydraulic_oil': 'Расходы на гидравлические масла',
    'special_lubricants': 'Расходы на специальные смазочны материалы',
    'customs_fees': 'Расходы на таможенные сборы',
    'cargo_insurance': 'Расходы на страховку грузов',
    'transloading_fees': 'Расходы на перегрузочные пункты',
    'temp_control_maintenance': 'Расходы на системы контроля температуры',
    'sterilization_costs': 'Расходы на стерилизацию транспорта',
    'pharma_licenses': 'Расходы на лицензии по перевозке лекарственных препаратов',
    'bucket_parts': 'Расходы на зубья ковшей экскаваторов',
};

export interface ChartData {
    category: string;
    subcategory: string;
    value: number;
}

export function transformToChartData(
    data: Record<string, any>,
    valueKeys?: string[]
): ChartData[] {
    const result: ChartData[] = [];
    for (const [category, values] of Object.entries(data)) {
        if (typeof values === 'object' && valueKeys && valueKeys.length > 0) {
           
            for (const key of valueKeys) {
                result.push({
                    category,
                    subcategory: key,
                    value: Number(values[key] || 0),
                });
            }
        } else {
           
            result.push({
                category,
                subcategory: 'value',
                value: Number(values || 0),
            });
        }
    }
    return result;
}

export function transformToChartDataForVehicles(data: Record<string, any>): ChartData[] {
  const result: ChartData[] = [];
  let totalDaysUsed = 0;
  let totalDistance = 0;

 
  for (const values of Object.values(data)) {
    if (typeof values === 'object' && values !== null) {
      totalDaysUsed += Number(values.days_used || 0);
      totalDistance += Number(values.total_distance || 0);
    }
  }

 
  result.push({ category: "Total Vehicles", subcategory: "days_used", value: totalDaysUsed });
  result.push({ category: "Total Vehicles", subcategory: "total_distance", value: totalDistance });

  return result;
}