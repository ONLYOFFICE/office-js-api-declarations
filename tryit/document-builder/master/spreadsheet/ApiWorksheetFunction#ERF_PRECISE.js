builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ERF_PRECISE(0.745));
builder.SaveFile("xlsx", "ERF_PRECISE.xlsx");
builder.CloseFile();