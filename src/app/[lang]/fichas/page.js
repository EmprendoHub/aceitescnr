"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  FileText,
  Download,
  Calendar,
  HardDrive,
} from "lucide-react";

export default function FichasPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [fetchingPdfs, setFetchingPdfs] = useState(false);

  // Check if already authenticated in session
  useEffect(() => {
    const authenticated = sessionStorage.getItem("fichasAuthenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchPdfs();
    }
  }, []);

  const fetchPdfs = async () => {
    setFetchingPdfs(true);
    try {
      const response = await fetch("/api/fichas");
      const data = await response.json();

      if (data.success) {
        setPdfs(data.pdfs);
      } else {
        setError("Error al cargar los archivos");
      }
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      setError("Error de conexión");
    } finally {
      setFetchingPdfs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/fichas/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("fichasAuthenticated", "true");
        setIsAuthenticated(true);
        fetchPdfs();
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error al verificar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-white mb-2">
              Fichas Técnicas
            </h1>
            <p className="text-center text-gray-300 mb-8">
              Ingresa la contraseña para acceder
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Verificando..." : "Acceder"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Fichas Técnicas
          </h1>
          <p className="text-gray-600 text-lg">
            Biblioteca de documentos técnicos
          </p>
        </div>

        {fetchingPdfs ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : pdfs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No hay archivos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfs.map((pdf, index) => (
              <div
                key={pdf.etag || index}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400"
              >
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 h-48 flex items-center justify-center">
                  <FileText className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                    PDF
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3
                    className="text-lg font-semibold text-gray-900 truncate"
                    title={pdf.name}
                  >
                    {pdf.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      <span>{formatFileSize(pdf.size)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(pdf.lastModified)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-center shadow-md hover:shadow-lg"
                    >
                      Ver PDF
                    </a>
                    <a
                      href={pdf.url}
                      download
                      className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-md hover:shadow-lg"
                      title="Descargar"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
