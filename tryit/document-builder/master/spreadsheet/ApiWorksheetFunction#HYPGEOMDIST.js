builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.HYPGEOMDIST(2, 3, 3, 12));
builder.SaveFile("xlsx", "HYPGEOMDIST.xlsx");
builder.CloseFile();