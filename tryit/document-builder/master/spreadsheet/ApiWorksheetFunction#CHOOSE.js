builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.CHOOSE(2, 3, 4, 89, 76, 0));
builder.SaveFile("xlsx", "CHOOSE.xlsx");
builder.CloseFile();