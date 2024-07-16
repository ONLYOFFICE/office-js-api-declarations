builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FLOOR(5.786, 0.7));
builder.SaveFile("xlsx", "FLOOR.xlsx");
builder.CloseFile();