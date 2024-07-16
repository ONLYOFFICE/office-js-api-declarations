builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.IMLOG10("-2+2.5i"));
builder.SaveFile("xlsx", "IMLOG10.xlsx");
builder.CloseFile();