builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.GESTEP(-2, 2));
builder.SaveFile("xlsx", "GESTEP.xlsx");
builder.CloseFile();