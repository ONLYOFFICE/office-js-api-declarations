builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FLOOR_MATH(-5.5, 2, 1));
builder.SaveFile("xlsx", "FLOOR_MATH.xlsx");
builder.CloseFile();