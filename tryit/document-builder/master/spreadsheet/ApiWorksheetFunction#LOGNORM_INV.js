builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.LOGNORM_INV(0.3, 2, 0.2));
builder.SaveFile("xlsx", "LOGNORM_INV.xlsx");
builder.CloseFile();