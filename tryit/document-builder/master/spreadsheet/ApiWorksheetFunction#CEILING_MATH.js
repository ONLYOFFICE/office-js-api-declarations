builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.CEILING_MATH(-5.5, 2, 1));
builder.SaveFile("xlsx", "CEILING_MATH.xlsx");
builder.CloseFile();