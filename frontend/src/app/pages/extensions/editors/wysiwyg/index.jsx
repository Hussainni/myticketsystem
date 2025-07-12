import { WysiwygEditor } from "@app/_components/extensions/editors/wysiwyg";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function WysiwygEditorPage() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Typography variant={"h1"} sx={{ mb: 3 }}>
        {t("extensions.title.wysiwygEditor")}
      </Typography>
      <WysiwygEditor />
    </Container>
  );
}
