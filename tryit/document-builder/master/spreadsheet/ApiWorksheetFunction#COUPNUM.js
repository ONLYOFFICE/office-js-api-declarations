builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COUPNUM("1/10/2018", "6/15/2019", 4, 1));
builder.SaveFile("xlsx", "COUPNUM.xlsx");
builder.CloseFile();