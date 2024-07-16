builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FLOOR_PRECISE(-6.7, 2));
builder.SaveFile("xlsx", "FLOOR_PRECISE.xlsx");
builder.CloseFile();