builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BESSELJ(1.9, 2));
builder.SaveFile("xlsx", "BESSELJ.xlsx");
builder.CloseFile();