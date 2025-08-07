const WelcomeNewChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">¡Bienvenido a Alicorp!</h2>
        <p className="text-muted-foreground max-w-md">
          Pregúntame sobre nuestra empresa: organigrama, misión, visión,
          proyectos y más.
        </p>
        <p className="text-sm text-muted-foreground">
          Puedes adjuntar imágenes, videos y documentos PDF.
        </p>
      </div>
    </div>
  );
};

export default WelcomeNewChat;
