builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.PDURATION("2.50%", 2000, 2200));
builder.SaveFile("xlsx", "PDURATION.xlsx");
builder.CloseFile();