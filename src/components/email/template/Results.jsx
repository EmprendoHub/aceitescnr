export default function Result({ emails }) {
  return (
    <>
      {emails.length === 0 ? (
        <div>Todos los correos se enviaron correctamente</div>
      ) : (
        <div>Error al enviar correos.</div>
      )}
    </>
  );
}
