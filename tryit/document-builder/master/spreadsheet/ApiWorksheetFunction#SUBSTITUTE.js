builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SUBSTITUTE("Online Office is a cloud business service portal", "Office", "portal"));
builder.SaveFile("xlsx", "SUBSTITUTE.xlsx");
builder.CloseFile();