builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.NPER(0.1/12, -500, 10000, 0));
builder.SaveFile("xlsx", "NPER.xlsx");
builder.CloseFile();