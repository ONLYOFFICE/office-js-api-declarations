builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();

var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.WORKDAY_INTL("9/8/2017", "-20", "0000011", "8/15/2017");

oWorksheet.GetRange("C1").SetValue(ans);

builder.SaveFile("xlsx", "WORKDAY.INTL.xlsx");
builder.CloseFile();