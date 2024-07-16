builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BESSELK(1.5, 1));
builder.SaveFile("xlsx", "BESSELK.xlsx");
builder.CloseFile();