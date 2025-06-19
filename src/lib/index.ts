// place files you want to import through the `$lib` alias in this folder.

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
    
    // Remove .0 if it exists after formatting (e.g., 1.0k → 1k)
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