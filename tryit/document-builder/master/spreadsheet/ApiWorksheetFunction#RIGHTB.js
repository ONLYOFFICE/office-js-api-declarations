builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.RIGHTB("Online Office", 2));
builder.SaveFile("xlsx", "RIGHTB.xlsx");
builder.CloseFile();