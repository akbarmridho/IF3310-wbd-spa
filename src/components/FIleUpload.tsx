import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { API_BASE_URL } from "@/lib/client.ts";

interface Props {
  onSuccess: (filename: string) => void;
}

export function FileUpload({ onSuccess }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleFileUpload = () => {
    if (selectedFile === null) {
      return;
    }

    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const uploadNextChunk = async () => {
      if (end <= selectedFile.size) {
        const chunk = selectedFile.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", String(chunkNumber));
        formData.append("totalChunks", String(totalChunks));
        formData.append("originalname", selectedFile.name);

        fetch(`${API_BASE_URL}/file`, {
          method: "POST",
          body: formData,
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log({ data });
            const temp = `Chunk ${
              chunkNumber + 1
            }/${totalChunks} uploaded successfully`;
            setStatus(temp);
            setProgress(Number((chunkNumber + 1) * chunkProgress));
            console.log(temp);
            chunkNumber++;
            start = end;
            end = start + chunkSize;

            if (end > selectedFile.size) {
              onSuccess(data.data.filename);
            }
            uploadNextChunk();
          })
          .catch((error) => {
            console.error("Error uploading chunk:", error);
          });
      } else {
        setProgress(100);
        setSelectedFile(null);
        setStatus("File upload completed");
      }
    };

    uploadNextChunk();
  };

  return (
    <div>
      <h2>Resumable File Upload</h2>
      <h3>{status}</h3>
      {progress > 0 && <Progress value={progress} />}
      <input
        type="file"
        onChange={(event) => {
          const files = event.target.files;

          if (files !== null) {
            setSelectedFile(files[0]);
          }
        }}
      />
      <Button onClick={handleFileUpload} disabled={selectedFile === null}>
        Upload File
      </Button>
    </div>
  );
}

export default FileUpload;
