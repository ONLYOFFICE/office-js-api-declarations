builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BETAINV(0.2, 4, 5));
builder.SaveFile("xlsx", "BETAINV.xlsx");
builder.CloseFile();