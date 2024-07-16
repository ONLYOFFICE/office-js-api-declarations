builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.HYPGEOM_DIST(2, 3, 3, 12, true));
builder.SaveFile("xlsx", "HYPGEOM_DIST.xlsx");
builder.CloseFile();