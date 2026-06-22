export function hasFilterValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined && value !== "";
}

export function setHasActiveFilters(filterSet) {
  if (!filterSet) {
    return false;
  }

  return [
    filterSet.period,
    filterSet.unity,
    filterSet.area,
    filterSet.role,
    filterSet.dismissalType,
    filterSet.gender,
    filterSet.etnia,
    filterSet.pcd,
    filterSet.state,
    filterSet.city,
  ].some(hasFilterValue);
}

export function isCompareMode(compareFilterSets) {
  if (!compareFilterSets || compareFilterSets.length === 0) {
    return false;
  }

  if (compareFilterSets.length > 1) {
    return true;
  }

  return setHasActiveFilters(compareFilterSets[0]);
}

export function omitPeriod(filterSet) {
  if (!filterSet) {
    return {};
  }

  const nextSet = { ...filterSet };
  delete nextSet.period;
  delete nextSet.id;
  delete nextSet.label;

  return nextSet;
}

const MONTH_SHORT = {
  janeiro: "Jan",
  fevereiro: "Fev",
  março: "Mar",
  marco: "Mar",
  abril: "Abr",
  maio: "Mai",
  junho: "Jun",
  julho: "Jul",
  agosto: "Ago",
  setembro: "Set",
  outubro: "Out",
  novembro: "Nov",
  dezembro: "Dez",
};

export function formatPeriodAxisLabel(periodText) {
  if (!periodText) {
    return "";
  }

  const match = String(periodText).match(/^(\w+)\s+de\s+(\d{4})$/i);

  if (!match) {
    return periodText;
  }

  const month = MONTH_SHORT[match[1].toLowerCase()] || match[1].slice(0, 3);
  const year = match[2].slice(-2);

  return `${month}/${year}`;
}

export function getTimelineSeriesLabel(set, index, compareFilterSets) {
  if (!isCompareMode(compareFilterSets)) {
    return "Sua Empresa";
  }

  return set.label || `Filtro ${index + 1}`;
}

const TIMELINE_FORWARD_FILL_METRICS = new Set([
  "nps",
  "laborRisk",
  "brandRisk",
  "realocateds",
  "termination",
  "laborIssues",
  "welcomed",
]);

export function shouldForwardFillTimeline(metricKey) {
  return TIMELINE_FORWARD_FILL_METRICS.has(metricKey);
}

export function isTimelineValueValid(value) {
  return (
    value !== null &&
    value !== undefined &&
    !(typeof value === "number" && Number.isNaN(value))
  );
}

/**
 * Meses sem novos registros mantêm a última média calculada (carry-forward).
 * Ex.: [null, 4, null] → [null, 4, 4]
 */
export function forwardFillTimelineValues(values) {
  let lastKnown = null;

  return values.map((value) => {
    if (isTimelineValueValid(value)) {
      lastKnown = value;
      return value;
    }

    return lastKnown;
  });
}

export function applyTimelineSeriesFill(metricKey, values) {
  if (!shouldForwardFillTimeline(metricKey)) {
    return values;
  }

  return forwardFillTimelineValues(values);
}

export function summarizeActiveFilters(filterSet, formatters = {}) {
  if (!filterSet) {
    return "";
  }

  const parts = [];

  const push = (prefix, value, formatter) => {
    if (!hasFilterValue(value)) {
      return;
    }

    parts.push(
      formatter ? `${prefix}: ${formatter(value)}` : `${prefix}: ${value}`
    );
  };

  push("Período", filterSet.period);
  push("Unidade", filterSet.unity);
  push("Área", filterSet.area);
  push("Cargo", filterSet.role);
  push("Demissão", filterSet.dismissalType, formatters.dismissalType);
  push("Gênero", filterSet.gender, formatters.gender);
  push("Etnia", filterSet.etnia, formatters.etnia);
  push("PCD", filterSet.pcd);
  push("Estado", filterSet.state);
  push("Cidade", filterSet.city);

  return parts.join(" · ");
}

export function parseMetricValue(value) {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }

  const raw = String(value).replace("%", "").replace(",", ".").trim();

  if (raw === "N/A" || raw === "Sem informações") {
    return NaN;
  }

  const parsed = Number(raw);

  return Number.isFinite(parsed) ? parsed : NaN;
}

function collectLabelsFromItems(itemsList, labelKey) {
  const labels = [];
  const seen = new Set();

  itemsList.forEach((items) => {
    (items || []).forEach((item) => {
      const label = item[labelKey];

      if (label !== undefined && label !== null && !seen.has(label)) {
        seen.add(label);
        labels.push(label);
      }
    });
  });

  return labels;
}

function findItemValue(items, labelKey, label, valueKey, parseValue) {
  const match = (items || []).find((item) => item[labelKey] === label);

  if (!match) {
    return NaN;
  }

  return parseValue(match[valueKey]);
}

export function buildCompareRows({
  compareResults,
  compareFilterSets,
  field,
  parseValue = parseMetricValue,
  summarizeFilterSet,
}) {
  if (!isCompareMode(compareFilterSets) || !compareResults.length) {
    return [];
  }

  return compareResults.map((result, index) => ({
    label: result.label || `Filtro ${index + 1}`,
    subtitle: summarizeFilterSet
      ? summarizeFilterSet(compareFilterSets[index])
      : "",
    value: parseValue(result[field]),
    insufficient: Boolean(result.lessThanFive),
  }));
}

export function buildCompareRowsRaw({
  compareResults,
  compareFilterSets,
  field,
  summarizeFilterSet,
}) {
  if (!isCompareMode(compareFilterSets) || !compareResults.length) {
    return [];
  }

  return compareResults.map((result, index) => ({
    label: result.label || `Filtro ${index + 1}`,
    subtitle: summarizeFilterSet
      ? summarizeFilterSet(compareFilterSets[index])
      : "",
    value: result[field],
    insufficient: Boolean(result.lessThanFive),
  }));
}

export function buildQuestionCompareGroups({
  compareResults,
  compareFilterSets,
  generalItems,
  labelKey = "question",
  valueKey = "count",
  parseValue = parseMetricValue,
  summarizeFilterSet,
}) {
  const compareMode = isCompareMode(compareFilterSets);
  const resultList = compareResults || [];
  const questions = collectLabelsFromItems(
    [...resultList.map((result) => result.shutDown || []), generalItems || []],
    labelKey
  );

  return questions.map((question) => {
    const rows = [];

    if (!compareMode) {
      const primary = resultList[0] || {};

      rows.push({
        label: "Sua Empresa",
        subtitle: "",
        value: findItemValue(
          primary.shutDown,
          labelKey,
          question,
          valueKey,
          parseValue
        ),
        insufficient: Boolean(primary.lessThanFive),
      });
    } else {
      resultList.forEach((result, index) => {
        rows.push({
          label: result.label || `Filtro ${index + 1}`,
          subtitle: summarizeFilterSet
            ? summarizeFilterSet(compareFilterSets[index])
            : "",
          value: findItemValue(
            result.shutDown,
            labelKey,
            question,
            valueKey,
            parseValue
          ),
          insufficient: Boolean(result.lessThanFive),
        });
      });
    }

    rows.push({
      label: "Média Geral",
      subtitle: "",
      value: findItemValue(generalItems, labelKey, question, valueKey, parseValue),
      insufficient: false,
      muted: true,
    });

    return {
      label: question,
      rows,
    };
  });
}

export function buildFeelingSurveyColumns({
  compareResults,
  compareFilterSets,
  generalItems,
  labelKey = "feeling",
  valueKey = "count",
  parseValue = parseMetricValue,
  summarizeFilterSet,
}) {
  const compareMode = isCompareMode(compareFilterSets);
  const resultList = compareResults || [];
  const labels = collectLabelsFromItems(
    [...resultList.map((result) => result.feelingMap || []), generalItems || []],
    labelKey
  );

  const columns = [];

  if (!compareMode) {
    const primary = resultList[0] || {};

    columns.push({
      key: "company",
      title: "Sua Empresa",
      hint: "Notas de 1 a 100",
      items: labels.map((label) => ({
        label,
        value: findItemValue(
          primary.feelingMap,
          labelKey,
          label,
          valueKey,
          parseValue
        ),
        insufficient: Boolean(primary.lessThanFive),
      })),
    });
  } else {
    resultList.forEach((result, index) => {
      columns.push({
        key: result.label || `filter-${index + 1}`,
        title: result.label || `Filtro ${index + 1}`,
        hint: summarizeFilterSet
          ? summarizeFilterSet(compareFilterSets[index])
          : "",
        items: labels.map((label) => ({
          label,
          value: findItemValue(
            result.feelingMap,
            labelKey,
            label,
            valueKey,
            parseValue
          ),
          insufficient: Boolean(result.lessThanFive),
        })),
      });
    });
  }

  columns.push({
    key: "general",
    title: "Média Geral",
    hint: "Benchmark de mercado",
    items: labels.map((label) => ({
      label,
      value: findItemValue(generalItems, labelKey, label, valueKey, parseValue),
      insufficient: false,
    })),
  });

  return columns;
}

export function buildPolarChartOptions(labels) {
  return {
    chart: {
      type: "polarArea",
    },
    labels: labels.map((label) => String(label)),
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#f54890", "#35a97d", "#1a27b7", "#f54890"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 70, 100],
        colorStops: [],
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
      },
    },
  };
}

export function buildFeelingMapCharts({
  compareResults,
  compareFilterSets,
  generalItems,
  summarizeFilterSet,
}) {
  const compareMode = isCompareMode(compareFilterSets);
  const resultList = compareResults || [];
  const charts = [];

  const appendChart = (title, subtitle, items) => {
    const feelings = items || [];

    if (!feelings.length) {
      return;
    }

    charts.push({
      label: title,
      subtitle,
      series: feelings.map((item) => parseMetricValue(item.count)),
      options: buildPolarChartOptions(feelings.map((item) => item.feeling)),
    });
  };

  if (!compareMode) {
    appendChart("Sua Empresa", "", resultList[0]?.feelingMap);
  } else {
    resultList.forEach((result, index) => {
      appendChart(
        result.label || `Filtro ${index + 1}`,
        summarizeFilterSet
          ? summarizeFilterSet(compareFilterSets[index])
          : "",
        result.feelingMap
      );
    });
  }

  appendChart("Média Geral", "Benchmark de mercado", generalItems);

  return charts;
}
