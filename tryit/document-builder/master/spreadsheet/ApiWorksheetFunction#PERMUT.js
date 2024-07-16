builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.PERMUT(32, 2));
builder.SaveFile("xlsx", "PERMUT.xlsx");
builder.CloseFile();