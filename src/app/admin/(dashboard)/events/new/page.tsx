import { PageHeader } from "@/components/admin/PageHeader";
import { EventForm } from "@/components/admin/EventForm";
import { createEvent } from "@/lib/actions/events";

export default function NewEventPage() {
  return (
    <div>
      <PageHeader title="Add Event" />
      <EventForm action={createEvent} />
    </div>
  );
}
