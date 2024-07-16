builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.COTH(0.785398));
builder.SaveFile("xlsx", "COTH.xlsx");
builder.CloseFile();