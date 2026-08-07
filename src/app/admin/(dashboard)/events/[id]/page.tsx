import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { EventForm } from "@/components/admin/EventForm";
import { prisma } from "@/lib/prisma";
import { updateEvent } from "@/lib/actions/events";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <PageHeader title={`Edit ${event.title}`} />
      <EventForm action={updateEvent} event={event} />
    </div>
  );
}
