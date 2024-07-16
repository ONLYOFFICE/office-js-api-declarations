// Specify that the AVERAGE function will be used to aggregate identical time values in the timeline data range:
var aggregation = 1;
oWorksheet.GetRange("B6").SetValue(oFunction.FORECAST_ETS("3/1/2018", oRange1, oRange2, 0, 1, aggregation));