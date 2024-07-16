builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.RRI(12, 10000, 20000));
builder.SaveFile("xlsx", "RRI.xlsx");
builder.CloseFile();