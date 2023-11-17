import { Button } from "@/components/ui/button.tsx";

interface DeleteDialogProps {
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteAnimeDialog({ onClose, onDelete }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md max-w-md">
        <p className="mb-4">Are you sure you want to delete this anime?</p>
        <div className="flex gap-2">
          <Button size="sm" onClick={onDelete} variant="destructive">
            Delete
          </Button>
          <Button size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
