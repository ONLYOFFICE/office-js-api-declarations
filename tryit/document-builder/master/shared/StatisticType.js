// Specify that the MASE metric will be returned:
var statType = 4;
oWorksheet.GetRange("B6").SetValue(oFunction.FORECAST_ETS_STAT(oRange1, oRange2, statType));