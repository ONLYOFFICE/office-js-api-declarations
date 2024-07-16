builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COUPDAYS("1/10/2018", "6/15/2019", 4, 1));
builder.SaveFile("xlsx", "COUPDAYS.xlsx");
builder.CloseFile();