builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DISC("10/15/2018", "1/1/2020", 98, 100, 1));
builder.SaveFile("xlsx", "DISC.xlsx");
builder.CloseFile();