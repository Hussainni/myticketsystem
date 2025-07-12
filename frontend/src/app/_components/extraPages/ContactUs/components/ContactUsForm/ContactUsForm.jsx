import { Div } from "@jumbo/shared";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { Button, CardContent, Typography } from "@mui/material";
import { validationSchema } from "./validation";
const ContactUsForm = () => {
  return (
    <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <CardContent>
        <Typography variant="h6" color={"text.secondary"}>
          Send Message
        </Typography>
        <Typography component={"h2"} variant="h1" mb={3}>
          {`Let's talk`}
        </Typography>
        <JumboForm
          sx={{
            mx: -1,

            "& .MuiFormControl-root:not(.MuiTextField-root)": {
              p: 1,
              mb: 2,
              width: { xs: "100%", sm: "50%" },
            },

            "& .MuiFormControl-root.MuiFormControl-fluid": {
              width: "100%",
            },
          }}
          onChange={() => {}}
          onSubmit={() => {}}
          validation={validationSchema}
        >
          <JumboInput
            fieldName="firstName"
            label="First Name"
            defaultValue="Abc"
          />
          <JumboInput
            fieldName="lastName"
            label="Last Name"
            defaultValue="Xyz"
          />
          <JumboInput
            fieldName="email"
            label={"Email"}
            defaultValue="demo@example.com"
          />
          <JumboInput
            fieldName="phone"
            label={"Phone No."}
            defaultValue="zab#723"
          />
          <JumboInput
            fieldName="website"
            label={"Website"}
            defaultValue="https://google.com"
            className="MuiFormControl-fluid"
          />
          <JumboInput
            fieldName="helpOption"
            label={"How can we help you?"}
            defaultValue="Hi there !!"
            className="MuiFormControl-fluid"
            multiline
            rows={4}
          />
          <Div sx={{ mx: 1 }}>
            <Button variant={"contained"} type={"submit"}>
              Submit
            </Button>
          </Div>
        </JumboForm>
      </CardContent>
    </Div>
  );
};

export { ContactUsForm };
