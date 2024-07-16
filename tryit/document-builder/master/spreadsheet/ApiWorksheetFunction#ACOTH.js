builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ACOTH(3));
builder.SaveFile("xlsx", "ACOTH.xlsx");
builder.CloseFile();